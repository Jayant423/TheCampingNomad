const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor,validateSchema} = require('../middleware');

const ExpressError = require("../utils/ExpressError");
const Campground = require('../models/campground');



router.get('/',catchAsync(campgrounds.index));

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.post('/',isLoggedIn,validateSchema,catchAsync(campgrounds.createCampground));

router.get('/:id', catchAsync(campgrounds.showCampground));

router.get("/:id/edit",isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

router.put('/:id',isLoggedIn,isAuthor, validateSchema,catchAsync(campgrounds.updateCampground))

router.delete('/:id',isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;
