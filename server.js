const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (error)=>{
    if (error){
      console.log('unable to write');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use (express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=> {
  //res.send('<h1>hello express</h1>')

  // res.send({
  //   name: 'james',
  //   likes: [
  //     'run',
  //     'read'
  //   ]

  res.render('homepage.hbs',{
    pageTitle: 'homepage',
    paragraphText: 'welcome to the homepage',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res)=> {
  res.render('about.hbs', {
    pageTitle: 'about page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res)=> {
  res.send({
    errorMessage: 'unable to fullfill request'
  })
});
app.listen(3000, ()=>{
  console.log('server is up')
});
