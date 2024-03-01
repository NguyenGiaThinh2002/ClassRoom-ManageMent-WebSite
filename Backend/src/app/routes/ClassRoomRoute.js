const express = require('express')
const router = express.Router();
const classRoomController = require('../controllers/ClassRoomController');


router.post('/createClass', classRoomController.createClass);
router.get('/getClass', classRoomController.getClass);
router.get('/getClassById/:classID', classRoomController.getClassByID);
router.put('/updateClass/:classID', classRoomController.updateClass); 


module.exports = router;