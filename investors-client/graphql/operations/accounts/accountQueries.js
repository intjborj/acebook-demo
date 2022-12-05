import {gql, useQuery} from '@apollo/client';


export const GET_ALL_ACCS = gql`
query Accounts($first: Int, $page: Int) {
  accounts(first: $first, page: $page) {
    data {
      _id
      username
      firstName
      middleName
      lastName
      departmentOnDuty {
        name
        _id
      }
      suffix
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

export const GET_DETAILED_ACC = gql`
query Accounts($first: Int, $page: Int, $id: String) {
  accounts(first: $first, page: $page, id: $id) {
    data {
      _id
      created_at
      updated_at
      suffix
      username
      firstName
      middleName
      lastName
      position
      isActive
      isApprover
      contact
      email
      token
      departmentOnDuty {
        _id
        created_at
        updated_at
        name
        description
      }
      department {
        _id
        created_at
        updated_at
        name
        description
      }
      restrictionCode
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

export const GET_NONDETAILED_ACC = gql`
query Accounts($first: Int, $page: Int, $id: String, $type: String) {
  accounts(first: $first, page: $page, id: $id, type: $type) {
    data {
      _id
     investorDetails{
       blocks
       isEmployee
       investorId
       votingHistory
     }
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


export const SEARCH_ACCS = gql`
query Search_accounts($name: String) {
  search_accounts(name: $name) {
    data {
      firstName
      middleName
      lastName
      _id
      departmentOnDuty {
        _id
        name
      }
    }
  }
}
`


