const express = require('express');
const router = express.Router();

const {
    loginPageController,profilePageController,
    feedPageController,searchPageController,
    uploadPageController,editPageController,
    searchProfileController
      } = require('../controllers/indexController') ;

const {
  registerRouteController,loginRouteController,
  logoutRouteController,updateRouteController,
  uploadRouteController,searchRouteController,
  likeRouteController,commentRouteController,
  followRouteController,unfollowRouteController
} = require('../controllers/userController') ;   

 const {isLoggedIn} = require('../middlewares/isloggedIn-middleware');
const upload = require('../config/multer-config');

router.get('/', function(req,res){
  res.render('index',{footer: false})
});

router.get('/login', loginPageController );
router.get('/feed',isLoggedIn,feedPageController );
router.get('/profile',isLoggedIn, profilePageController);
router.get('/search',isLoggedIn,searchPageController );
router.get('/upload',isLoggedIn, uploadPageController );
router.get('/edit', isLoggedIn,editPageController );

router.post('/register',registerRouteController);
router.post('/login',loginRouteController);
router.get('/logout',logoutRouteController);
router.post('/update',isLoggedIn, upload.single('image'),updateRouteController);
router.post('/upload',upload.single('image'),isLoggedIn,uploadRouteController);
router.get('/username/:username',isLoggedIn, searchRouteController);
router.get('/user/:id',isLoggedIn, searchProfileController);
router.get('/post/like/:id',isLoggedIn,likeRouteController);
router.post("/post/comment/:id",isLoggedIn,commentRouteController);
router.post("/follow/:id",isLoggedIn,followRouteController);
router.post('/unfollow/:id',isLoggedIn,unfollowRouteController);

module.exports = router;