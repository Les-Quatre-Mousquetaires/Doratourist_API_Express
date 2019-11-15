var express = require('express');
var router = express.Router();

var songController = require('../app/controllers/SongsController');
var userController = require('../app/controllers/UsersController');
var albumController = require('../app/controllers/AlbumsController');

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


/* ROUTE song page */
router.route('/songs')
  .get(middlewareJWT, songController.index)
  .post(middlewareJWT,
    uploader.fields([{ name: 'imageUpload', maxCount: 1 }, { name: 'songUpload', maxCount: 1 }]),
    songController.new);

router.route('/songs/:resourceId')
  .get(middlewareJWT, songController.view)
  .patch(middlewareJWT,
    uploader.fields([{ name: 'imageUpload', maxCount: 1 }]),
    songController.update)
  .delete(middlewareJWT, songController.delete);


/* ROUTE album page */
router.route('/albums')
  .get(middlewareJWT, albumController.index)
  .post(middlewareJWT, uploader.fields([{ name: 'imageUpload', maxCount: 1 }]), albumController.new);

router.route('/albums/:resourceId')
  .get(middlewareJWT, albumController.view)
  .patch(middlewareJWT, uploader.fields([{ name: 'imageUpload' }]), albumController.update)
  .delete(middlewareJWT, albumController.delete);

module.exports = router;
