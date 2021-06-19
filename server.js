
// Dependensies Initialization 
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')




// Model Initialization

const name_location = require("./MongoModel/Name-Location")


//Setting Up public folder

app.use(express.static('public'))


//Boddy-parser Config
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())




// view Engine Setup 
app.set('view engine','ejs')
app.set('views','G:/Projects/Under Development/GoGaga-Internship-test/resourses/views')






// Database Connection
mongoose.connect('mongodb://localhost:27017/GoGaga', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDb is Connected ")
});









// All get requests 
app.get('/',(req,res)=>{
    res.render("index")
    
})

app.get('/list',(req,res)=>{
    name_location.find({}).then(result=>{
        res.render('list',{list:result})
    }).catch(err=>{
        console.log(err)
        res.send("Something went Wrong")
    })
})



// All post request 

app.post('/submit',(req,res)=>{

    if ((req.body.name.trim().length === 0 || req.body.location.trim().length === 0)  ){
        res.send("Please fill all feilds")
    }
    else{
        const nameLocation = new name_location({
            name : req.body.name,
            location : req.body.location
        })
        nameLocation.save().then(result=>{
            res.send("Data is Submited")
        }).catch(err=>{
            res.send("Something went wrong")
        })
    }
    
})



app.post('/search',(req,res)=>{
    var searchElement = req.body.search
    searchElement = searchElement.trim()
    if(searchElement.length === 0)
    {
        res.send("Please fill the Search filled")
    }
    name_location.find({ name: searchElement.trim() }).then(result=>{
        if (result.length === 0 ){
            name_location.find({ location: searchElement.trim() }).then(result=>{
               if(result.length> 0){
                   res.render('searchresult',{list:result})
               }
               else{
                   res.send("Nothing found")
               }
            })
        }else{
            res.render('searchresult',{list:result})
        }
    }).catch(err=>{
        console.log(err)
        res.send("Somethong went wrong")
    })
})



















// Listening Server 
app.listen(port||3000,()=>{
    console.log("Server is running on post = "+ (port||3000))
    
})
