import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs, SpecObjectArgs } from '@/common/dto/pagination.args';
import { DepartmentService } from './department.service';
import { DepartmenId, UpsertDepartmentInput } from './dto/department.input';
import { DepartmentData, DepartmentPaginator, DeptPaginatorArg} from './dto/department.args';
import { DepartmentEnt } from './entities/department.entity';

@Resolver(() => DepartmentEnt)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => DepartmentEnt)
  async upsertDepartment(
    @Args('input') upsertInput: UpsertDepartmentInput,
  ): Promise<DepartmentEnt> {

    return this.departmentService.upsert(upsertInput);
  }

  @Mutation(() => DepartmentEnt)
  async deleteDepartment(
    @Args('input') deleteInput: DepartmenId,
  ): Promise<DepartmentEnt> {

    return this.departmentService.delete(deleteInput);
  }

  @Query(() => DepartmentPaginator, { name: 'departments' })
  getTags(@Args() getArgs: DeptPaginatorArg) {
  // getTags(@Args() getArgs: PaginationArgs) {
    return this.departmentService.findAll(getArgs);
  }

 @Query(() => DepartmentData, { name: 'department' })
  getDepartment(@Args() getArgs: SpecObjectArgs) {
    return this.departmentService.findOne(getArgs);
  }

 

 
}
