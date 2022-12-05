import { Injectable } from '@nestjs/common';
import { paginate } from '@/common/pagination/paginate';
import { SupplierEnt } from './entities/supplier.entity';
import moment from 'moment';
// import  Supplier  from './entities/supplier.entity';
import Supplier from '@models/Masterdata/Supplier';
import { SupplierId, UpsertSupplierInput } from './dto/supplier.input';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { BulkSupplierData } from './dto/supplier.args';
import { isEmpty } from 'class-validator';

@Injectable()
export class SupplierService {
  async upsert(upsertInput: UpsertSupplierInput): Promise<SupplierEnt> {
    let savedData;
    if (upsertInput._id) {
      savedData = await Supplier.findOneAndUpdate(
        { _id: upsertInput._id },
        { $set: upsertInput },
        { new: true },
      );
    } else {
      savedData = new Supplier({
        name: upsertInput.name,
        migrationId: upsertInput.migrationId,
        mobile: upsertInput.mobile,
        email: upsertInput.email,
        url: upsertInput.url,
        information: upsertInput.information,
        address: upsertInput.address,
        contactPerson: upsertInput.contactPerson,
        contactTelephone: upsertInput.contactTelephone,
        contactEmail: upsertInput.contactEmail,
      });
      await savedData.save();
    }

    return savedData;
  }

  async delete(upsertInput: SupplierId): Promise<SupplierEnt> {
    let removedData = await Supplier.findOneAndDelete({
      _id: upsertInput._id,
    });

    return removedData;
  }

  async bulkInsert(upsertInput: BulkSupplierData): Promise<boolean> {

    let result = await Supplier.insertMany(upsertInput.suppliers)

    if(!isEmpty(result) ){
      return true;
    }else{
      return false;
    }

    
  }


  async findAll({ page, first }: PaginationArgs) {
    const supplier: SupplierEnt[] = await Supplier.find();
    return {
      data: supplier,
      paginatorInfo: paginate(
        supplier.length,
        page,
        first,
        supplier.length,
      ),
    };
  }

  async findOne(payload: SpecObjectArgs) {
    const supplier: SupplierEnt = await Supplier.findOne({ _id: payload.id });
    return {
      data: supplier,
    };
  }
}
