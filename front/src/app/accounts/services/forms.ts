import _ from "lodash"

export const accFormDefaultValue = (data: any) => {

  let payload: any = _.cloneDeep(_.get(data, "accounts.data[0]"))

  if (_.get(data, "accounts.data[0].restrictionCode")) {
    let refRestriction = _.get(data, "accounts.data[0].restrictionCode").map((item: string) => {
      return { code: item }
    })

    payload.restrictionCode = refRestriction
  }

  if (payload && (_.get(payload, "investorDetails.blocks") || _.get(payload, "investorDetails.isEmployee") || _.get(payload, "investorDetails.investorId"))) {
    payload.blocks = _.get(payload, "investorDetails.blocks")
    payload.isEmployee = _.get(payload, "investorDetails.isEmployee")
    payload.investorId = _.get(payload, "investorDetails.investorId")
  }
  return payload

}