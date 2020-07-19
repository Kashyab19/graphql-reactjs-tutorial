import React from 'react';

//Used to parse the Graph-Ql query into JS
import {gql} from 'apollo-boost';

//bind it to the component:
import {graphql} from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {getSingleBook} from "../queries/queries";

class BookDetails extends React.Component {
  displayBookDetails(){
    const {book} = this.props.data;
    if(book){
      return(
        <div>
          <h4>Book Name:{book.name}</h4>
          <h4>Genre:{book.genre}</h4>
          <h4>Author:{book.author.name}</h4>
          <h2>Other books by {book.author.name}</h2>
            <ul className="other-books">
                {book.author.books.map(item =>{
          return <li key={item.id}>{item.name}</li>
        })

        }
      </ul>
        </div>
      )
    }
    else
    {
      return(<h1>no books are selected</h1>);
    }
  }
 
  
   render(){
     console.log(this.props)
     
    
      return (
      <div id="book-details">

       <h1>Book Details here...</h1>
       {this.displayBookDetails()}
        
      </div>
    );
      }
  }
  
  export default graphql(getSingleBook,{
    options:(props) =>{
      return{
        variables:{
          id:props.bookId
        }
      }
    }
  })(BookDetails);