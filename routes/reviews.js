const express = require('express');
const router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview,isLoggedIn} = require('../middleware');
const reviews = require('../controllers/reviews')

const ExpressError = require("../utils/ExpressError");
const catchAsync = require('../utils/catchAsync');




router.post('/', isLoggedIn,validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', catchAsync(reviews.deleteReview))

module.exports = router;