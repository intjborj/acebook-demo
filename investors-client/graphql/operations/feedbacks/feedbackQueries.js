import {gql, useQuery} from '@apollo/client';


export const GET_ALL_FBCATEGORY = gql`
query Data {
  fbCategorys {
    data {
      _id
      name
      description
    }
  }
}
`

export const GET_ALL_FBQUESTION = gql`
query Data {
  fbQuestions {
    data {
      _id
      question
    }
  }
}
`

export const GET_ALL_FBCATQUE = gql`
query Data($id: String, $categoryId: String) {
  fbCategoryQuestions(_id: $id, categoryId: $categoryId) {
    data {
      _id
      category {
        _id
        name
        color
        icon
        description
      }
      questions {
        _id
        question
      }
    }
  }
}
`


export const GET_LIST_FBCATQUE = gql`
query ExampleQuery {
  fbCategoryQuestions {
    data {
      _id
      category {
        _id
        name
      }
    }
  }
}

`

export const GET_FEEDBACKS = gql`
query Data {
  feedbacks {
    data {
      _id
      created_at
      remarks
      category {
        name
      }
      feedback {
        question {
          question
        }
        answer
      }
      
    }
  }
}
`