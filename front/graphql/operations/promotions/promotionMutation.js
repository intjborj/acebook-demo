import {gql, useMutation} from '@apollo/client';


export const UPSERT_PROMOTION = gql`
mutation UpsertPromotion($input: UpsertPromotionInput!) {
  upsertPromotion(input: $input) {
    data {
      path
    }
  }
}
`



export const DELETE_PROMOTION = gql`
mutation DeletePromotion($input: PromotionId!) {
  deletePromotion(input: $input) {
    _id
  }
}
`


