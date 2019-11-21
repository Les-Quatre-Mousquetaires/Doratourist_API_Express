var express = require('express');
var router = express.Router();

var userController = require('../app/controllers/UsersController');
var tourController = require('../app/controllers/ToursController');
var commentController = require('../app/controllers/CommentsController');
var { middlewareJWT } = require('../app/middleware/middlewareJwt');
var uploader = require('../app/middleware/uploader');
var addResourceMiddleware = require('../app/middleware/ResourceNameMiddleware');

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

/* ROUTE tour page*/
router.route('/tours')
  .get(middlewareJWT, tourController.index)
  .post(middlewareJWT, tourController.new);

router.route('/tours/:resourceId')
  .get(middlewareJWT, tourController.view)
  .patch(middlewareJWT, tourController.update)
  .put(middlewareJWT, tourController.update)
  .delete(middlewareJWT, tourController.delete);

/* ROUTE comment */
router.route('/tours/:resourceId/comments')
  .get(middlewareJWT, addResourceMiddleware('Tour'), commentController.index)
  .post(middlewareJWT, addResourceMiddleware('Tour'), commentController.new);

module.exports = router;
