import React, { useContext, useEffect, useState,  } from 'react'
import axios from '../services/axios'
import { useAuth } from './AuthProvider';

export const AppContext = React.createContext();
export default function AppProvider({children}) {
    const {user} = useAuth()
    const [classList, setClassList] = useState([])
    const [allUser, setAllUser] = useState([]);
    const [selectedClassId, setSelectedClassRoomId] = useState("");
    const [notificationByClassId, setNotification] = useState([]);
    const [files, setFiles] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [waitingStudentList, setWaitingStudentList] = useState([]);
    const [render, setRender] = useState(false);
    const [allAssignmentById, setAllAssignmentById] = useState([]);
    const [allSubmittedAssignmentsById, setAllSubmittedAssignmentsById] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openStoringClasses, setOpenStoringClasses] = useState(false);
    const [storedClasses, setStoredClasses] = useState([])
    const UserEmail = user?.email || '';
    // const classID = selectedClassId;

    const handleChilderRender = () =>{
        setRender(!render)
    }

    const handleSetOpenStoringClasses = () =>{
        setOpenStoringClasses(true);
    }
    const handleSetCloseStoringClasses = () =>{
        setOpenStoringClasses(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/auth/getUser')
                setAllUser(response.data)
            } catch (error) {
                console.log('Cannot get ClassList', error);
            }
        };
        fetchData();
    },[render]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/class/getClass')
                setClassList(response.data)
            } catch (error) {
                console.log('Cannot get ClassList', error);
            }
        };
        fetchData();
    },[render]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/class/getStoredClass')
                setStoredClasses(response.data)
            } catch (error) {
                console.log('Cannot get ClassList', error);
            }
        };
        fetchData();
    },[render]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getAllFiles')
                setFiles(response.data)
            } catch (error) {
                console.log('Cannot get ClassList', error);
            }
        };
        fetchData();
    },[render]);

    useEffect(() => {
        const fetchData = async () => {
                if(selectedClassId){
                    try {
                        const response = await axios.get(`/notification/getNotification/${selectedClassId}`);
                        setNotification(response.data);
                        
                        console.log("thisisNoitificationBbyID:" ,response.data);
                    } catch (error) {
                        console.log('Cannot get Notification', error);
                    }  
                }
                else{
                    setNotification([]);
                }

        }
        fetchData();
    },[selectedClassId, render]);

    useEffect(() => {
        const fetchData = async () => {
            if(selectedClassId){
                try {
                    const response = await axios.get(`/assignment/getAllAssignmentsById/${selectedClassId}`);
                    if(!response){
                        setLoading(true)
                    }
                    if(response){
                        setLoading(false)
                    }
                    setAllAssignmentById(response.data)
                    console.log("this is AllAssignment", allAssignmentById);
                } catch (error) {
                    console.log('Cannot get AllAssignmentById', error);
                }
            }
        }
        fetchData();
    }, [selectedClassId, render]);

    useEffect(() => {
        const fetchData = async () => {
            if(selectedClassId){
                try {
                    const response = await axios.get(`/submittedAssignment/getAllSubmittedAssignmentsById/${selectedClassId}`);
                    setAllSubmittedAssignmentsById(response.data)
                    console.log("this is submittedAssignment", allSubmittedAssignmentsById);
                } catch (error) {
                    console.log('Cannot get AllAssignmentById', error);
                }
            }
        }
        fetchData();
    }, [selectedClassId, render]);

    useEffect(() => {
        const fetchData = async () => {
          if (selectedClassId) {
            try {
              const listIds = selectedClass.studentID;
              const response = await axios.get('/auth/getUserById', {
                params: {
                  listIds: listIds
                }
              });
              console.log(response.data);
              setStudentList(response.data); // Assuming the response contains the data property
      
            } catch (error) {
              console.log('Cannot get StudentList', error);
            }
          }
        };
      
        fetchData();
      }, [render, selectedClassId]); // Include selectedClassId as a dependency

      useEffect(() => {
        const fetchData = async () => {
          if (selectedClassId) {
            try {
              const listIds = selectedClass.waitingStudents;
              const response = await axios.get('/auth/getUserById', {
                params: {
                  listIds: listIds
                }
              });
              console.log(response.data);
              setWaitingStudentList(response.data); // Assuming the response contains the data property
      
            } catch (error) {
              console.log('Cannot get StudentList', error);
            }
          }
        };
      
        fetchData();
      }, [selectedClassId, render]); // Include selectedClassId as a dependency
      


    const loginnedUserId = React.useMemo(
        () => allUser.find((user) => user.email === UserEmail) || {},
        [allUser, UserEmail]
    , [render]);

    const recommentedUser = React.useMemo(
        () => allUser.filter((user) => user.email !== UserEmail) || [],
        [allUser, UserEmail]
    )

    const classListByTeacherID = React.useMemo(
        () => classList.filter((thisclass) => thisclass.teacherID === loginnedUserId._id) || [],
        [classList, loginnedUserId._id]
    );
    
    const selectedClass = React.useMemo(
        () => classList.find((classRoom) => classRoom._id === selectedClassId) || {},
        [classList, selectedClassId]
    );
    
    // const classListOfStudent = React.useMemo(() => {
    //     const foundClass = classList.find((classRoom) => classRoom.studentID.some(id => id === loginnedUserId._id));
    //     return foundClass || {};
    //     // console.log("class ListOfStudent found", foundClass);
    // }, [classList, loginnedUserId]);
    

    const classListOfStudent = React.useMemo(() => {
        const foundClasses = classList.filter((classRoom) => classRoom.studentID.some(id => id === loginnedUserId._id));
        return foundClasses;
    }, [classList, loginnedUserId]);


    

    const setClassEmpty = () =>{
        setSelectedClassRoomId("")
    }

    const findPerson = (id) =>{
         const thePerson = allUser.find((user) => user._id === id);
        return thePerson;
    }

    const findAssignment = (id) =>{
        const theAssignment = allAssignmentById.find((assignment) => assignment._id === id);
        return theAssignment;
    }

    const findClass = (id) =>{
        const theClass = classList.find((thisClass) => thisClass._id === id);
        return theClass;
    }
    // const submittedAssignmentsByStudentId = React.useMemo(
    //     () => allSubmittedAssignmentsById.find((assigmentItem) => assigmentItem.studentID === selectedClassId) || {},
    //     [classList, selectedClassId]
    // );

    const submittedAssignmentsByStudentId = (id) =>{
        const theAssignment = allSubmittedAssignmentsById.filter((assignment) => assignment.studentID === id) || [];
        return theAssignment;
    }

    // allSubmittedAssignmentsById

    const findSubmittedAssignment = (id) =>{
        const theAssignment = allSubmittedAssignmentsById.find((assignment) => assignment.assignmentID === id);
        if(theAssignment){
            return theAssignment;
        }else{
            return [];
        }
    }

    const findSubmittedAssignmentByStudentId = (id, studentID) =>{
        const theAssignment = allSubmittedAssignmentsById.find((assignment) => assignment.assignmentID === id && assignment.studentID === studentID);
        if(theAssignment){
            return theAssignment;
        }else{
            return [];
        }
    }



  return (
    <AppContext.Provider value={{classList, classListByTeacherID, setSelectedClassRoomId, selectedClass,setClassList, setClassEmpty, allAssignmentById
    , allUser, loginnedUserId, recommentedUser, notificationByClassId, setNotification, files,setFiles, studentList, setStudentList, 
    handleChilderRender , classListOfStudent, findPerson, findAssignment , loading, allSubmittedAssignmentsById, findSubmittedAssignment,
     submittedAssignmentsByStudentId, findSubmittedAssignmentByStudentId, waitingStudentList, setWaitingStudentList, handleSetOpenStoringClasses, handleSetCloseStoringClasses,
      openStoringClasses, storedClasses, findClass}}>
        {children}
    </AppContext.Provider>
  )
}
export const useApp = () => {
    return useContext(AppContext);
};