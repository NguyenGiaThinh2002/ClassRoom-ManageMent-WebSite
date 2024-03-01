const Auth = require('./AuthRoute')
const ClassRoom = require('./ClassRoomRoute')
// const Notification = require('./NotificationRoute')
// const File = require('./fileRoutes')
const uploadRoutes = require('./uploadRoutes');
const notificationRoute = require('./NotificationRoute')
function route(app){
    app.use('/auth', Auth);
    app.use('/class', ClassRoom);
    app.use('/api', uploadRoutes);
    app.use('/notification', notificationRoute)

    // app.use('/notification', Notification)
    // app.use('/file', File)
   
}
module.exports = route;