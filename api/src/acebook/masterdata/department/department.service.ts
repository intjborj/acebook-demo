import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { DepartmentEnt } from './entities/department.entity';
import moment from 'moment';
// import  Department  from './entities/department.entity';
import Department from '../../../../models/Masterdata/Department';
import { DepartmenId, UpsertDepartmentInput } from './dto/department.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { DeptPaginatorArg } from './dto/department.args';

@Injectable()
export class DepartmentService {
  async upsert(upsertInput: UpsertDepartmentInput): Promise<DepartmentEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Department.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Department({
        name: upsertInput.name,
        description: upsertInput.description,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: DepartmenId): Promise<DepartmentEnt> {
    let removedData = await Department.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll(payload: DeptPaginatorArg) {

    let filter = {}
    if (payload.searchArg) {
      filter = DeptFilter(payload)
    }
    const department: DepartmentEnt[] = await Department.find(filter);

    return {
      data: department,
      paginatorInfo: paginate(
        department.length,
        payload.page,
        payload.first,
        department.length,
      ),
    };
  }

  async findOne({ id }: SpecObjectArgs) {
    const department: DepartmentEnt = await Department.findOne({ _id: id });
    return {
      data: department
    };
  }
}


function DeptFilter({ searchArg }: DeptPaginatorArg) {
  var nameRegex = new RegExp(searchArg.description);
  let filter = {}

  if (searchArg.description) {
    filter = {
      $or: [
        { name: { $regex: nameRegex, $options: 'i' } },
        { description: { $regex: nameRegex, $options: 'i' } },
      ]
    }
  }
  return filter
}
