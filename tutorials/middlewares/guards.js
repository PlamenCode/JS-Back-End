function hasUser(){
    return (req, res, next) => {
        if(req.user){
            next();
        } else {
            res.redirect('/auth/login')
        };
    };
};

function isGuest(){
    return (req, res, next) => {
        if(req.user){
            // TODO change where to redirect if the logged in user tries to go somewhere
            // where he is not allowed to due to being logged in (login, register etc.)
            // some tasks require users to be redirected to catalog and guests to home
            res.redirect('/'); 
        } else{
            next();
        };
    };
};

module.exports = {
    hasUser,
    isGuest
}