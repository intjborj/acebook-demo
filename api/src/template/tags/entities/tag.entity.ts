import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Attachment } from '@/common/entities/attachment.entity';
import { CoreEntity } from '@/common/entities/core.entity';
import { Product } from '@/template/products/entities/product.entity';
import { Type } from 'src/types/entities/type.entity';

@InputType('TagInputType', { isAbstract: true })
@ObjectType()
export class Tag extends CoreEntity {
  name: string;
  slug: string;
  @Field(() => Int)
  parent?: number;
  details?: string;
  image?: Attachment;
  icon?: string;
  type?: Type;
  products?: Product[];
}
