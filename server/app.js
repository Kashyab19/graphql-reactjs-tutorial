const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

//Express.js doesnt understand the graphql on its own.
const graphqlHTTP = require('express-graphql');

//Instance of Express being binded to an variable called app
const app = express();

//File Imports
const schema = require('./schema/schema')


//Cors:
app.use(cors())

//second parameter in SetTimeOut is milliseconds 1ms=0.001s
//Yet to do :Error Handling
setTimeout(function(){
    mongoose.connect('mongodb+srv://kashyab:password@cluster0-wd6ik.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority',
                { useNewUrlParser: true, useUnifiedTopology: true }
                );
},6000)



mongoose.connection.once(
    'open',
    () => {
    console.log("MongoDB Atlas Connected using Mongoose")
    }
)

app.use('/customroute',
        graphqlHTTP({
            //2nd argument is a function to fire the graphqlHTTP
            schema
            
            })

        

);//end of app.use()

app.listen(5000,
            () => {
                console.log("Listening on port 5000");
            }//End of 2nd argument - Callback
    );