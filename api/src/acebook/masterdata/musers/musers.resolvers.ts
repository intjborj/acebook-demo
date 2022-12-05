import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MuserService } from './musers.service';
import { GetMusersArgs, MuserPaginator } from './dto/get-muser.args';
import { MuserEnt } from './entities/muser.entity';

@Resolver(() => MuserEnt)
export class MusersResolver {
  constructor(private readonly musersService: MuserService) {}

  

  @Query(() => MuserPaginator, { name: 'musers' })
  getTags(@Args() getMusersArgs: GetMusersArgs) {
    return this.musersService.findAllMusers(getMusersArgs);
  }

 

 
}
