import { ReactionEnt } from '@/acebook/referenceType/reaction.entity';
import { UserEntAB } from '@/users/entities/user.entity';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity, CoreEntityMg } from '@/common/entities/core.entity';
import { PostEnt } from '../../post/entities/post.entity';

@ObjectType()
export class CommentEntCommon extends CoreEntityMg {
  message?: string;
  isArchived?: boolean;
}

@ObjectType()
export class CommentEnt extends CommentEntCommon {
// export class CommentEnt extends CommentEntCommon {
  message: string;
  user?: UserEntAB;
  comments?: CommentEnt[];
  reactions?: ReactionEnt[];
  post?: PostEnt;

  // name: string;
  // description: string;
}

@InputType('commentInputType', { isAbstract: true })
@ObjectType()
export class CommentInputEnt extends CommentEntCommon {
  user?: string;
  postOwner?: string;
  comments?: string[];
  reactions?: string[];
  post?: string;
  // name: string;
  // description: string;
}



// NO reation icon details yet