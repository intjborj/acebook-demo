import { CommentPaginatorArg } from "../dto/comment.args";



export const commentObjectFilter = (args: CommentPaginatorArg, type: string) => {

    switch (type) {
        case "view":
            return {
                $and: [
                    { post: args.postId },
                    { isArchived: { $ne: true } }
                ]
            }
            break;

        default:
            break;
    }


}