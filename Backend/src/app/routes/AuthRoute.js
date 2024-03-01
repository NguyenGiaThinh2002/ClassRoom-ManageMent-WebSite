const express = require('express');
const authController = require('../controllers/AuthController');
const router = express.Router();

router.post('/signup', authController.register);
router.get('/getUser', authController.getUser);
router.get('/getOneUser', authController.getOneUser);
router.post('/addUser/:classID', authController.addUser);
router.get('/getUserById', authController.getUserById)
// router.use("/:slug", loginController.show)

module.exports = router;
