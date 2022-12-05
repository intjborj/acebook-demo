import { ArgsType } from '@nestjs/graphql';
import { CoreGetArguments } from '@/common/dto/core-get-arguments.args';

@ArgsType()
export class GetTagArgs extends CoreGetArguments {}
