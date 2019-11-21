let addResouceMiddleware = (resouceName) => {
    return function (req, res, next) {
        req.resourceName = resourceName;
        next();
    }
}

module.exports = addResouceMiddleware;
