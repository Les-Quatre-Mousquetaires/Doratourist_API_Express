var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');

var { middlewareJWT } = require('../app/middleware/middlewareJwt');
var uploader = require('../app/middleware/uploader');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.route('/test').post(middlewareJWT, uploader.fields([{ name: 'images', maxCount: 2 }, { name: 'audios', maxCount: 1 }]), (req, res, next) => {
//   res.json({ message: 'ok' });
// });

/* ROUTE user page */
router.route('/users')
  .get(middlewareJWT, userController.index)
  .post(middlewareJWT, userController.new);

router.route('/users/:resourceId')
  .get(middlewareJWT, userController.view)
  .patch(middlewareJWT, userController.update)
  .put(middlewareJWT, userController.update)
  .delete(middlewareJWT, userController.delete);

module.exports = router;
