const express = require('express');
const router = express.Router();

const {
    loginPageController,profilePageController,
    feedPageController,searchPageController,
    uploadPageController,editPageController
      } = require('../controllers/indexController') ;

const {
  registerRouteController
} = require('../controllers/userController')    


router.get('/', function(req,res){
  res.render('index',{footer: false})
});

router.get('/login', loginPageController );
router.get('/feed', feedPageController );
router.get('/profile', profilePageController);
router.get('/search',searchPageController );
router.get('/upload', uploadPageController );
router.get('/edit', editPageController );

router.post('/register',registerRouteController)

module.exports = router;