const graphql = require("graphql");
const _ = require("lodash");


//Importing Models:
const Book = require("../models/book")
const Author = require("../models/author");


//Destructuring the data and this is very unusual
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID ,
        GraphQLList,
        GraphQLInt,
        GraphQLNonNull} = graphql;


//Specifying fields
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
          return Author.findById(parent.authorId);
      }
  }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "AuthorType defining props of Author Data",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    //you can destructure or use the below method "graphql.GraphQLInt"
    age: { type: graphql.GraphQLInt },
    country :{type:GraphQLString},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
          return Book.find({ authorId: parent.id });
      }
  }
  })
});

//Defining a RootQueryType is important so as to make sure that we fetch.

// book{ -->the book is the RootQueryType
//     name
//     genre
// }

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query for 1:Single Book || 2:Single Author || 3:Books ||4:Authors",
  fields: {
    //#1
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        interest: { type: GraphQLString },
          
      },
      resolve(parent, args) {
        //traverses through the array "books" and looks for id
        return Book.findById(args.id);
      }, //end of resolve function
    }, //end of book

    //#2
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },//end of author

    //#3
    books : {
      type : new GraphQLList(BookType),
      resolve(parent,args)
      {
        //although we dont use the 2 parameters,they are compulsory for resolve function
        // return all books
        return Book.find({});
      }
    },

    //#4
    authors : {
      type : new GraphQLList(AuthorType),
      resolve(parent,args){
        // return authors
        return Author.find({});
      }
    }

  }, //end of field
});

//Mutation:

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addAuthor: {
          type: AuthorType,
          args: {
              name: { type:new GraphQLNonNull(GraphQLString) }
          },
          resolve(parent, args){
              let author_local = new Author({
                  name: args.name
              });
          return author_local.save();
          }
      },
      addBook : {
        type : BookType,
        args :{
          name : { type :new GraphQLNonNull(GraphQLString) },
          genre : { type: new GraphQLNonNull(GraphQLString)  },
          authorId: { type: new GraphQLNonNull(GraphQLID)  },
        },
        resolve(parent,args){
          let book = new Book({
           name : args.name,
           genre :args.genre,
           authorId:args.authorId 
          })
          return book.save()
        }
      }
  }
});

//export it to other files so that we can use it in other files

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
});
