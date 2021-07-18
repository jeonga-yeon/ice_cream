export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.locals.loggedIn);
    console.log(res.session);
    res.locals.siteName = "Ice Cream";
    next();
};