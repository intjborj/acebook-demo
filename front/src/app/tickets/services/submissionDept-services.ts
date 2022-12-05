export const restructSubmDept = (data: any) => {
    let payload: any = []

    if (data) {
        payload = data.map((item: any) => {
            let rec: { department: string; status?: string | null; updatedAt?: string | null } = {
                department: item?.department?._id ?? (item?._id ?? null),
                status: item?.status ?? null,
                updatedAt: item?.updatedAt ?? null
            }
            return rec
        })
    }
    return payload

}