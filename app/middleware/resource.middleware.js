function addResourceMiddleware(req, res, next, resouceName) {
    req.resourceName = resourceName;
    next();
}

module.export = addResourceMiddleware;
