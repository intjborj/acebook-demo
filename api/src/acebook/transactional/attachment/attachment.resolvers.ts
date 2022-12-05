import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PaginationArgs } from '@/common/dto/pagination.args';
import { AttachmentService } from './attachment.service';
import { AttachmentId, UpsertAttachmentInput } from './dto/attachment.input';
import { AttachmentPaginator} from './dto/attachment.args';
import { AttachmentEnt } from './entities/attachment.entity';

@Resolver(() => AttachmentEnt)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Mutation(() => AttachmentEnt)
  async upsertAttachment(
    @Args('input') upsertInput: UpsertAttachmentInput,
  ): Promise<AttachmentEnt> {

    return this.attachmentService.upsert(upsertInput);
  }

  @Mutation(() => AttachmentEnt)
  async deleteAttachment(
    @Args('input') deleteInput: AttachmentId,
  ): Promise<AttachmentEnt> {

    return this.attachmentService.delete(deleteInput);
  }

  @Query(() => AttachmentPaginator, { name: 'attachments' })
  getTags(@Args() getArgs: PaginationArgs) {
    return this.attachmentService.findAll(getArgs);
  }

 

 
}
