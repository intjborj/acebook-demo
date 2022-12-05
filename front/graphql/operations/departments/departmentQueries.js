import {gql, useQuery} from '@apollo/client';


export const GET_ALL_DEPTS = gql`
query Data($searchArg: GenSearchType) {
  departments(searchArg: $searchArg) {
    data {
      _id
      created_at
      updated_at
      name
      description
    }
    paginatorInfo {
      count
      currentPage
      firstItem
      lastItem
      lastPage
      total
      hasMorePages
      perPage
    }
  }
}
`
export const GET_DEPTS = gql`
query Department($id: String) {
  department(id: $id) {
    data {
      _id
      name
      description
    }
  }
}
`
