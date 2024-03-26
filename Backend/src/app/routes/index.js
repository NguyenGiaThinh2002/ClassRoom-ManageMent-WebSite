const Auth = require('./AuthRoute')
const ClassRoom = require('./ClassRoomRoute')
const uploadRoutes = require('./uploadRoutes');
const notificationRoute = require('./NotificationRoute')
const assignmentRoute = require('./AssignmentRoute')
const submittedAssignment = require('./SubmittedAssignment')
function route(app){
    app.use('/auth', Auth);
    app.use('/class', ClassRoom);
    app.use('/api', uploadRoutes);
    app.use('/notification', notificationRoute);
    app.use('/assignment', assignmentRoute);
    app.use('/submittedAssignment', submittedAssignment);
    // app.use('/notification', Notification)
    // app.use('/file', File)
   
}
module.exports = route;