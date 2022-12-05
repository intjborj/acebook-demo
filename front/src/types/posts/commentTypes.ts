import { AccFormValues } from '@/types/accounts/accountTypes';
export type CommentType = {
    _id?: string;
    message: string;
    user?: AccFormValues;
    created_at?: string;
  };
  