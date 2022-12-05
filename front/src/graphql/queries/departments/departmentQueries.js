import {gql, useQuery} from '@apollo/client';


export const GET_ALL_DEPTS = gql`
query Data {
    departments {
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