require('dotenv').config();
const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
const PORT=process.env.PORT||3000
 const bodyParser=require('body-parser')
//routes
const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')



app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}))
app.use(bodyParser.json())


// Database connection
//const url = 'mongodb://localhost/mybrary';
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',function(){
    console.log('database connected..');
}).catch(err=>{
    console.log('connection fail..')
});

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)



app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})