require('dotenv').config({ path: '../.env' });


const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const axios = require('axios');

const path = require('path');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);



const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    // Delete all existing Campground documents
    await Campground.deleteMany({});
    
    // Create a new Campground document and save it
   for (let i = 0;i<10;i++){
    const random140 =i;
    const price = Math.floor(Math.random() *20) + 1000;
    const camp = new Campground({
      author: '652d64ce2dee8320a5c1255c',
        location: `${cities[random140].city}, ${cities[random140].state}`,
        title: `${cities[random140].title}`,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil animi doloremque exercitationem? Numquam dolores aut architecto cupiditate? Nisi vitae est provident aperiam repudiandae, magni accusamus et quisquam deserunt nostrum. Sit.',
        price,
        geometry: {
         type: 'Point',
            coordinates: [
                cities[random140].longitude,
                cities[random140].latitude,
              ]
            },
        images: [
          {
            url: `${cities[random140].image1}`,
            filename: `${cities[random140].filename1}`
            
          },
          {
            url: `${cities[random140].image2}`,
            filename:  `${cities[random140].filename2}`
            
          }
        ]
    })
    


    await camp.save();
   }
}

// Call the seedDB function here, which will run when this script is executed
seedDB().then(()=>{
    mongoose.connection.close();
});
