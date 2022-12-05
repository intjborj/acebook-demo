import { AccFormValues } from '@/types/accounts/accountTypes';
export type ReactionType = {
    user?: AccFormValues,
    reactionIcon?: ReactionIconType,
}

export type ReactionIconType = {
    name?: string,
    path?: string,
}