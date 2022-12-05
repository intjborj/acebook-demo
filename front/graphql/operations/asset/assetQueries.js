import {gql, useQuery} from '@apollo/client';


export const GET_ALL_MANUFACTURER = gql`
query Data {
   manufacturers : assManufacturers {
    data {
      _id
      mobile
      name
    }
  }
}
`

export const GET_SPEC_MANUFACTURER = gql`
query AssManufacturer($id: String) {
   manufacturer : assManufacturer(id: $id) {
    data {
      _id
      mobile
      name
    }
  }
}
`
export const GET_ALL_ASSETS = gql`
query Data($searchArg: GenSearchType, $page: Int, $perPage: Int) {
  assets(searchArg: $searchArg, page: $page, perPage: $perPage) {
    data {
      _id
      model
      name
      description
      prefix
      count
      systemCount
      handlingDepartment {
        _id
        name
      }
    },
     paginatorInfo {
      count
      currentPage
      firstItem
      lastItem
      lastPage
      perPage
      total
      hasMorePages
    }
  }
}
`
export const GET_SPEC_ASSET = gql`
query Asset($id: String) {
  asset(id: $id) {
    data {
      _id
      model
      name
      description
      count
      prefix
      created_at
      updated_at
      handlingDepartment {
        _id
        name
      }
      assetVariation {
        propertyCode
        serialNo
        _id
        model
        isArchived
        manufacturer {
          name
          _id
        }
      }
    }
  }
}
`
export const GET_SPEC_ASSET_VAR = gql`
query AssetVariation($id: String) {
  assetVariation(id: $id) {
    data {
      _id
      asset {
        _id
        name
      }
      manufacturer {
        _id
        name
      }
      model
      propertyCode
      serialNo
      updated_at
      cost
      condition
      ipms
      description
      deployedDate
      supplier {
        _id
        name
      }
    }
  }
}
`
export const GET_ASSET_VARIATIONS = gql`
query AssetVariations($perPage: Int, $page: Int, $asset: String, $searchArg: GenSearchType) {
  assetVariations(perPage: $perPage, page: $page, asset: $asset, searchArg: $searchArg) {
    data {
      propertyCode
        serialNo
        _id
        model
        manufacturer {
          name
          _id
        }
        isArchived
        cost
        condition
        ipms
        description
        deployedDate
        supplier {
          _id
          name
        }
    }
    assetData {
      _id
        model
        name
        prefix
        count
        description
        created_at
        updated_at  
    }
    paginatorInfo {
      count
      currentPage
      firstItem
      lastItem
      lastPage
      perPage
      total
      hasMorePages
    }
  }
}
`
export const SEARCH_ASSET = gql`
query Data($text: String) {
  search_asset(text: $text) {
    data {
      _id
      model
      name
      description
    }
  }
}
`


export const GET_ALL_SUPPLIER = gql`
query Query {
  assSuppliers {
    data {
      _id
      name
      mobile
      migrationId
      email
      url
      information
      address
    }
  }
}
`
export const GET_SPEC_SUPPLIER = gql`
query AssSupplier($id: String) {
  assSupplier(id: $id) {
    data {
      _id
      created_at
      updated_at
      name
      migrationId
      mobile
      email
      url
      information
      address
      contactPerson
      contactTelephone
      contactEmail
    }
  }
}
`
