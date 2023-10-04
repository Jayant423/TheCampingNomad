
const mongoose = require('mongoose');
const cities = require('./cities');
const{places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

const path = require('path');
const dbUrl = "mongodb://127.0.0.1:27017/yelp-camp";

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

 async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'JzMk9I_fSBaEQK7U8yzR6BPG19dR8gLr2OGhId67Hg8',
          collections: 483251,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }
const seedDB = async () => {
    // Delete all existing Campground documents
    await Campground.deleteMany({});
    
    // Create a new Campground document and save it
   for (let i = 0;i<48;i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() *20) + 10;
    const camp = new Campground({
      author: '651a2e0852ca3b4720f5042d',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image : await seedImg(),
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil animi doloremque exercitationem? Numquam dolores aut architecto cupiditate? Nisi vitae est provident aperiam repudiandae, magni accusamus et quisquam deserunt nostrum. Sit.',
        price
    })
    
    await camp.save();
   }
}

// Call the seedDB function here, which will run when this script is executed
seedDB().then(()=>{
    mongoose.connection.close();
});
