module.exports= {
    isLoggedin(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedin(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile')
    }
};