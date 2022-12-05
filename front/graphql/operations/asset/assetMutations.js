import { gql, useMutation } from '@apollo/client';


export const UPSERT_MANUFACTURER = gql`
mutation UpsertManufacturer($input: UpsertManufacturerInput!) {
  upsertManufacturer(input: $input) {
    _id
  }
}
`

export const UPSERT_ASSET = gql`
mutation UpsertAsset($input: UpsertAssetInput!) {
  upsertAsset(input: $input) {
    _id
  }
}
`

export const UPSERT_ASSET_VARIATION = gql`
mutation UpsertAssetVariation($input: UpsertAssetVariationInput!) {
  upsertAssetVariation(input: $input) {
    _id
  }
}
`

export const ARCHIVE_ASSET_VARIATION = gql`
mutation ArchiveAssetVariation($input: UpsertAssetVariationInput!) {
  archiveAssetVariation(input: $input) {
    _id
    isArchived
  }
}
`


export const UPSERT_SUPPLIER = gql`
mutation UpsertSupplier($input: UpsertSupplierInput!) {
  upsertSupplier(input: $input) {
    _id
  }
}
`

