import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { TicketTypeEnt } from './entities/ticketType.entity';
import moment from 'moment';
// import  TicketType  from './entities/ticketType.entity';
import TicketType from '@models/Masterdata/TicketType';
import { TicketTypeId, UpsertTicketTypeInput } from './dto/ticketType.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { TicketTypePaginator, TicketTypePaginatorArg } from './dto/ticketType.args';

const objectFilters = (args: TicketTypePaginatorArg) => {

  switch (args.type) {
    case "specific":
      if (args.code) {
        return {
          $and: [
            { code: args.code },
          ]
        }
      }
      break;
    case "all":
        return {}
      break;

    default:
      return {
        $or: [
          { isDisabled: false },
          { isDisabled: { $exists: false } },
          { isDisabled: { $exists: true, $ne: true } },
        ]
      }
      break;
  }




  // return {}
}


@Injectable()
export class TicketTypeService {
  async upsert(upsertInput: UpsertTicketTypeInput): Promise<TicketTypeEnt> {
    let savedData;
    if (upsertInput.code) {
      savedData = await TicketType.findOneAndUpdate(
        { code: upsertInput.code },
        {
          $set: {
            isDisabled: upsertInput.isDisabled,
            approvers: upsertInput.approvers,
            assignments: upsertInput.assignments,
            submissionDepartment: upsertInput.submissionDepartment,
            addWorkWOAssignedP: upsertInput.addWorkWOAssignedP,
            addWorkWOApprovers: upsertInput.addWorkWOApprovers,
            serviceDepartment: upsertInput.serviceDepartment
          }
        },
        { new: true },
      );
    } else {
      savedData = new TicketType({
        name: upsertInput.name,
        code: upsertInput.code,
        approvers: upsertInput.approvers,
        assignments: upsertInput.assignments,
        submissionDepartment: upsertInput.submissionDepartment,
        serviceDepartment: upsertInput.serviceDepartment
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: TicketTypeId): Promise<TicketTypeEnt> {
    let removedData = await TicketType.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll(payload: TicketTypePaginatorArg) {
    let filters = objectFilters(payload as TicketTypePaginatorArg);
    const ticketType: TicketTypeEnt[] = await TicketType.find(filters)
      .populate({ path: "approvers", populate: { path: "departmentOnDuty", model: "Department" } })
      .populate({ path: "assignments", populate: { path: "departmentOnDuty", model: "Department" } })
      .populate("submissionDepartment")
      .populate("serviceDepartment")
      ;
    return {
      data: ticketType,
      paginatorInfo: paginate(
        ticketType.length,
        payload.page,
        payload.first,
        ticketType.length,
      ),
    };
  }


}
