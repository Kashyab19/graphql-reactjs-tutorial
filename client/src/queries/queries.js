//Used to parse the Graph-Ql query into JS
import {gql} from 'apollo-boost';


const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`


const getBookQuery = gql`
{
  books{
    name
    genre
    id
  }
}
`

const addBookMutation = gql`
  mutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
      name
      id
    }
  }
`

const addAuthorMutation = gql`
mutation($name:String!){
  addAuthor(name:$name)
    {
    name
    }
}

`
const getSingleBook =gql`
query($id:ID){
  book(id:$id){
    id
    name
    genre
    author{
      name
      age
      books{
        name
        genre
      }
    }
  }
}
`

export {getAuthorsQuery,getBookQuery,addBookMutation,getSingleBook,addAuthorMutation}