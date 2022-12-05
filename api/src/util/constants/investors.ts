export const INVESTOR_ACCOUNT_FILTER = {
    $or: [
        { 'investorDetails.blocks': { $gt: 0 } }
    ]
}