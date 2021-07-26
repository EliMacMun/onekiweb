module.exports = (req, res, next) => {
    console.log(req.route.path);
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('redi', req.route.path)
        return res.redirect('/login');
    }
}