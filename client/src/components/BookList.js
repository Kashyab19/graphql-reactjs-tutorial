import React from 'react';



//bind it to the component:
import {graphql} from 'react-apollo';

import {getBookQuery} from "../queries/queries";
import BookDetails from './BookDetails';


class BookList extends React.Component {
  constructor(props)
  {
    super(props)
    this.state ={
      selected : ""
    }
  }
  displayBooks(){
    var data = this.props.data
    if(data.loading)
       return(<div><h1>Loading..</h1></div>)
    else{
      return data.books.map(bookMap =>{
        return(
        <li id={bookMap.id} onClick =
        {
          (e)=>{
            this.setState({selected:bookMap.id})
          }
        }>{bookMap.name}</li>
        )
      })
    }
  }
 render(){
    console.log(this.props)
    return (
    <div>
      <ul id ="book-list">
          {this.displayBooks()}
      </ul>
      <BookDetails bookId={this.state.selected}/>
      
      
    </div>
  );
    }
}

export default graphql(getBookQuery)(BookList);
