const ClassRoom = require('../models/ClassRoom')
// const router = express.Router;

class ClassRoomController {
    // [POST] /auth/signup
    async createClass(req, res){
        try {
            // const teacherID = req.body.teacherID;
            // const className = req.body.className;
            // const description = req.body.description;
            // const teacherID = req.body.teacherID;
            // const studentID = req.body.studentID;
            // const createdAt = req.body.createdAt;
            const {className,description,teacherID, createdAt, classCode} = req.body;
            const classRoom = await ClassRoom.create({className,description,teacherID, createdAt, classCode});
            return res.status(201).json(classRoom)
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    async getClass(req,res){
        try {
            const classClist = await ClassRoom.find();
            return res.status(200).json(classClist);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    async getClassByID(req, res) {
        try {
          const classID = req.params.classID;
          const classData = await ClassRoom.findById(classID);
          if (!classData) {
            return res.status(404).json({ error: 'Class not found' });
          }
          return res.status(200).json(classData);
        } catch (error) {
          console.error('Error fetching class data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    
      async updateClass(req, res){
        try {
            const classID = req.params.classID;
            const { className, description, teacherID, createdAt, classCode } = req.body;
      
            const updatedClass = await ClassRoom.findByIdAndUpdate(
              classID,
              { className, description, teacherID, createdAt, classCode },
              { new: true }
            );
      
            if (!updatedClass) {
              return res.status(404).json({ error: 'Class not found' });
            }
      
            return res.status(200).json(updatedClass);
          } catch (error) {
            console.error('Error updating class:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
      }

}
module.exports = new ClassRoomController;