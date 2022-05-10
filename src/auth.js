export default (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('redi', req.route.path)
        return res.redirect('/login');
    }
}