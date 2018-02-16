const express= require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT||3000;
app.use(  (req,res,next)=>{
    var now= new Date().toString();
    var log = `${now} + ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
            console.log('NOT APPENDED TO LOG!');
    });
    next();
})


//app.use( (req,res,next)=>{
//    res.render('maintainence.hbs');
//} )

app.get('/',(req,res)=>{
   res.render('home.hbs',{
        pageTitle: 'Home Page',
       welcomeMessage:'Welcome to my Website!'
    });
})


app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname +'/views/partials');
 
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view_engine','hbs');
app.use(express.static(__dirname +'/public'));
app.get('/about',(req,res)=>{
    //res.send('<h1> ABOUT ME </h1>');
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage:'Badd Request Error'
    });
})
app.listen(port,()=>{
    console.log(`Server is up ${port}`);
});