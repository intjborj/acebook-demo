import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { ManufacturerEnt } from './entities/manufacturer.entity';
import moment from 'moment';
// import  Manufacturer  from './entities/manufacturer.entity';
import Manufacturer from '@models/Masterdata/Manufacturer';
import { ManufacturerId, UpsertManufacturerInput } from './dto/manufacturer.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { BulkManufacturerData } from './dto/manufacturer.args';

@Injectable()
export class ManufacturerService {
  async upsert(upsertInput: UpsertManufacturerInput): Promise<ManufacturerEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Manufacturer.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Manufacturer({
        name: upsertInput.name,
        mobile: upsertInput.mobile,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: ManufacturerId): Promise<ManufacturerEnt> {
    let removedData = await Manufacturer.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async bulkInsert(upsertInput: BulkManufacturerData): Promise<boolean> {

    let result = await Manufacturer.insertMany(upsertInput.manufacturers).then(function () {
      console.log("Data inserted")  // Success
    }).catch(function (error) {
      console.log(error)      // Failure
    });

    if(result){
      return true;
    }else{
      return false;
    }

    
  }


  async findAll({ page, first }: PaginationArgs) {
    const manufacturer: ManufacturerEnt[] = await Manufacturer.find();
    return {
      data: manufacturer,
      paginatorInfo: paginate(
        manufacturer.length,
        page,
        first,
        manufacturer.length,
      ),
    };
  }

  async findOne(payload: SpecObjectArgs) {
    const manufacturer: ManufacturerEnt = await Manufacturer.findOne({ _id: payload.id });
    return {
      data: manufacturer,
    };
  }
}
