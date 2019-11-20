module.export = {
    addResourceMiddleware: (resourceName) => {
        return (req, res, next) => {
            req.resourceName = resourceName;
            next();
        }
    }
}