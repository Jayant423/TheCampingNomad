const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor,validateSchema} = require('../middleware');

const ExpressError = require("../utils/ExpressError");
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,validateSchema,catchAsync(campgrounds.createCampground));

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
        .get( catchAsync(campgrounds.showCampground))
        .put(isLoggedIn,isAuthor, validateSchema,catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground));



router.get("/:id/edit",isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

module.exports = router;
