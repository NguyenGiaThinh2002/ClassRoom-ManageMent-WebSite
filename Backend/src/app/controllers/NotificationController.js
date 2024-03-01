const { notification } = require('antd');
const Notification = require('../models/Notification')
const mongoose = require('mongoose');
class NotificationController {
  async createNotification(req, res){
    try {
        const {classID,content,files} = req.body;
        const notification = await Notification.create({classID,content,files});
        // console.log(notification._id);
        return res.status(201).json(notification);
    } catch (error) {
        return res.status(400).send(error);
    }
}
    async getNotification(req, res){
        try {   
            const classId = req.params.classID;
            // console.log(classId);
            const notification = await Notification.find({ classID: classId });
            return res.status(200).json(notification);
        } catch (error) {
            return res.status(400).send(error);
        } 
    }
    async getNotificationById(req, res){
        try {
            const notificationId = req.params.notificationId;
            console.log(notificationId);
            const notification = await Notification.findById(notificationId);
            return res.status(201).json(notification);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    async updateNotification(req, res){
        try {   
            const notificationId = req.params.notificationId;
            console.log(notificationId);
            const {content, files} = req.body;
            const updateNotification = await Notification.findByIdAndUpdate(notificationId, {content, files}, { new: true });
            if (!updateNotification) {
                return res.status(404).json({ error: 'Class not found' });
              }
              
              return res.status(200).json(updateNotification);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
    async deleteNotification(req, res){
        try {
            const notificationId=req.params.notificationId;
            const notification = await Notification.deleteOne({_id : notificationId});
            return res.status(200).json(notification);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = new NotificationController();
