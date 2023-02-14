const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    res.locals.title = "Beers";
    res.locals.beers = beersFromApi; 
    res.render("beers", {title: "Beers", beers: beersFromApi});
  }) 
  .catch(error => console.log(error))
  ;
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log(randomBeer);
    res.render("random-beer", {beer: randomBeer, title: "Random Beer"});
  })
})

app.get('/beer/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(thisBeer => {
    res.render("id", {beer: thisBeer, title: thisBeer[0].name})
  .catch(error => console.log(error))
  })})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
