const express = require('express');
const submittedAssignment = require('../controllers/SubmittedAssignmentController')
const router = express.Router();

router.post('/createSubmittedAssignment', submittedAssignment.createSubmittedAssignment);
router.get('/getAllSubmittedAssignmentsById/:classID', submittedAssignment.getAllSubmittedAssignmentsById)
router.put('/updateSubmittedAssignmentById', submittedAssignment.updateSubmittedAssignmentById)
module.exports = router;