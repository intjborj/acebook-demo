import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { CompConfigEnt } from './entities/compConfig.entity';
import moment from 'moment';
// import  CompConfig  from './entities/compConfig.entity';
import CompanyConfig from '@models/investor/masterdata/CompanyConfiguration';
import { CompConfigId, UpsertCompConfigInput } from './dto/compConfig.input';
import { PaginationArgs } from '@/common/dto/pagination.args';

@Injectable()
export class CompConfigService {
  async upsert(upsertInput: UpsertCompConfigInput): Promise<CompConfigEnt> {

  let  getData = await CompanyConfig.find({}).limit(1)

    let savedData = await CompanyConfig.findOneAndUpdate(
      { _id: getData[0]._id },
      { $set: {investor: upsertInput.investor} },
      { new: true },
    );

    return savedData;
  }

  async delete(upsertInput: CompConfigId): Promise<CompConfigEnt> {
    let removedData = await CompanyConfig.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async findAll({ page, first }: PaginationArgs) {
    const compConfig: CompConfigEnt[] = await CompanyConfig.find();
    return {
      data: compConfig,
      paginatorInfo: paginate(
        compConfig.length,
        page,
        first,
        compConfig.length,
      ),
    };
  }
}
