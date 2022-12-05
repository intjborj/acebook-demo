import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { AccConfigEnt } from './entities/accConfig.entity';
import moment from 'moment';
import MUser from '@models/User';
// import  AccConfig  from './entities/accConfig.entity';
// import AccConfig from '@models/Masterdata/AccConfig';
import {   AccConfigId, UpdateAccConfigInput } from './dto/accConfig.input';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { ACObjectSetter } from './services/objectSetter';

@Injectable()
export class AccConfigService {
  async upAccConfig(upsertInput: UpdateAccConfigInput): Promise<AccConfigEnt> {
    let savedData;
    if (upsertInput._id) {

      savedData = await MUser.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: ACObjectSetter(upsertInput) },
        { new: true },
      );

    }

    return savedData;
  }

  


}
