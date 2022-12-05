import { TicketSearchType } from "../../ticket/dto/ticket.args";
import { PostPaginatorArg } from "../dto/post.args";

var ObjectId = require('mongoose').Types.ObjectId;
export const postObjectFilters = (args: PostPaginatorArg) => {

    let filterArr = []
    if (switchType(args)) {
        let switchResult = switchType(args)
        filterArr.push(switchResult)
    }

    if (args.searchArg?.isSearch && searchFilterType(args.searchArg)) {
        let searchResult = searchFilterType(args.searchArg)
        filterArr.push(searchResult)
    }

    if (args.searchArg?.startDate && args.searchArg?.endDate) {
        let dateResult = dateFilterType(args.searchArg)
        filterArr.push(dateResult)
    }

    let payload = {
        $and: filterArr
    }

    return filterArr.length > 0 ? payload : null

}
const switchType = (args: PostPaginatorArg) => {
    switch (args.type) {
        case 'tags':
            if (args.departmentId) {
                return {
                    $and: [
                        { taggedDepartments: new ObjectId(args.departmentId) },
                        { isArchived: { $ne: true } }
                    ]
                }
            }
            break;

        case 'posts':
            if (args.departmentId) {
                return {
                    $and: [
                        { createdByDepartment: new ObjectId(args.departmentId) },
                        { isArchived: { $ne: true } }
                    ]
                }
            }
            break;

        case 'privacy':
            let samp = {
                $or: [
                    { createdByDepartment: args.departmentId },
                    { createdByDepartment: new ObjectId(args.departmentId) },
                    { taggedDepartments: args.departmentId },
                    { taggedDepartments: new ObjectId(args.departmentId) },
                    { createdBy: args.user },
                    { createdBy: new ObjectId(args.user) },
                    { taggedUsers: args.user },
                    { taggedUsers: new ObjectId(args.user) },
                    { privacy: 'Public' }
                ]
            }
            return {
                $and: [
                    samp,
                    { isArchived: { $ne: true } }
                ]
            }
            break;

        case 'specific':
            if (args._id) {
                return { _id: new ObjectId(args._id) }
            }
            break;

        case 'all_departments':
                return  { isArchived: { $ne: true } }
            break;

        case 'specific_user':
            if (args.user) {
                return {
                    $and: [
                        { createdBy: new ObjectId(args.user) },
                        { isArchived: { $ne: true } }
                    ]
                }
            }
            break;

        case 'specific_user_archived':
            if (args.user) {
                return {
                    $and: [
                        { createdBy: new ObjectId(args.user) },
                        { isArchived: true }
                    ]
                }
            }
            break;

        default:
            return null
            break;
    }

}

const searchFilterType = (args: TicketSearchType) => {
    var nameRegex = new RegExp(args.description);
    return {
        $or: [
            { content: { $regex: nameRegex, $options: 'i' } },
        ]
    }
}

const dateFilterType = (searchArg: TicketSearchType) => {
    var nameRegexStartDate = new RegExp(searchArg.startDate);
    var nameRegexEndDate = new RegExp(searchArg.endDate);

    let startTime = new Date(searchArg.startDate);  // OR Number(startTime)
    let endTime = new Date(searchArg.endDate);  // OR Number(endTime)

    let payload = {
        $or: [
            {
                created_at: {
                    $gte: Number(startTime),
                    $lte: Number(endTime)
                }
            }
            // ,
            // { created_at: { $regex: nameRegexStartDate, $options: 'i' } },
            // { created_at: { $regex: nameRegexEndDate, $options: 'i' } }
        ]
    }

    return payload
}