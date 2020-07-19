import React from 'react';

//Used to parse the Graph-Ql query into JS
import {gql} from 'apollo-boost';

//bind it to the component:
import {graphql} from 'react-apollo';
import { flowRight as compose } from 'lodash';

import {getAuthorsQuery,addBookMutation,getBookQuery} from "../queries/queries";

class AddBook extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            name : "",
            genre : "",
            authorId: "",
        }
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading)
        {
            return(<option disabled>Authors are coming..</option>)
        }
        else
        {
            return data.authors.map(authorLocal => {
            return(<option key={authorLocal.id} value ={authorLocal.id}>{authorLocal.name}</option>)
            })
        }
    }
    
    submitForm(e){
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation(
            {
                variables:{
                    name:this.state.name,
                    genre:this.state.genre,
                    authorId:this.state.authorId
                },
                refetchQueries:[{query:getBookQuery}]
            }
        );
    }

    
   render(){
      console.log(this.props)
      
      return (
        <form id="add-book" onSubmit = {this.submitForm.bind(this)}>
        <div className="field">
            <label>Book name:</label>
            <input type="text"  onChange={
                (e) =>this.setState({name : e.target.value})
            }/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={
                (e) =>this.setState({genre : e.target.value})
            }/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={
                (e) =>this.setState({authorId : e.target.value})
            }>
                <option>Select authors</option>
                { this.displayAuthors() }
            </select>

           {/* Call your add author component here */}

        </div>
        <div>
            <button>+</button>
        </div>   
    </form>
    );
      }
  }
  
  export default compose(
      graphql(getAuthorsQuery,{name : "getAuthorsQuery"}),
      graphql(addBookMutation,{ name : "addBookMutation"})
  )(AddBook);