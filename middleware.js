const {campgroundSchema,reviewSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError.js');
const Campground = require('./models/campground.js');


module.exports.isLoggedIn =(req,res,next)=>{
    console.log("REQ.USER...",req.user);
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in.');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateSchema = (req,res,next) =>{
    
    const {error}  = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    } else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error',"You do not have the permission");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
