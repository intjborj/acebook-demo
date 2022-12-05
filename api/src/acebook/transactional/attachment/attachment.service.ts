import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { AttachmentEnt } from './entities/attachment.entity';
import moment from 'moment';
// import  Attachment  from './entities/attachment.entity';
import Attachment from '@models/Transactionals/Attachments';
import { AttachmentId, UpsertAttachmentInput } from './dto/attachment.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { MultiAttachmentArgs } from './dto/attachment.args';

@Injectable()
export class AttachmentService {
  async upsert(upsertInput: UpsertAttachmentInput): Promise<AttachmentEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Attachment.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Attachment({
        path: upsertInput.path,
        refId: upsertInput.refId,
        createdBy: upsertInput.createdBy,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: AttachmentId): Promise<AttachmentEnt> {
    let removedData = await Attachment.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const attachment: AttachmentEnt[] = await Attachment.find();
    return {
      data: attachment,
      paginatorInfo: paginate(
        attachment.length,
        page,
        first,
        attachment.length,
      ),
    };
  }
}

export const saveMultiAttachments = ({attachments, user}: MultiAttachmentArgs) => {
  let allAttachments = []
  attachments.map(async (i,item) => {
    let resultAtt = new Attachment({
      path: i.path,
      type: i.type,
      createdBy: user,
    });
    allAttachments.push(resultAtt._id)
    await resultAtt.save();
  })

  return allAttachments;
}
