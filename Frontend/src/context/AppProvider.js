import React, { useContext, useEffect, useState } from 'react'
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
    const [render, setRender] = useState(false);

    const UserEmail = user?.email || '';
    // const classID = selectedClassId;

    const handleChilderRender = () =>{
        setRender(!render)
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
    },[]);

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
    },[]);

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
          if (selectedClassId) {
            try {
              const listIds = selectedClass.studentID;
            //   console.log(selectedClass.studentID);
      
              // Use axios with the params property
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
      }, [selectedClassId]); // Include selectedClassId as a dependency
      


    const loginnedUserId = React.useMemo(
        () => allUser.find((user) => user.email === UserEmail) || {},
        [allUser, UserEmail]
    );

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



    const setClassEmpty = () =>{
        setSelectedClassRoomId("")
    }


  return (
    <AppContext.Provider value={{classListByTeacherID, setSelectedClassRoomId, selectedClass,setClassList, setClassEmpty
    , allUser, loginnedUserId, recommentedUser, notificationByClassId, setNotification, files,setFiles, studentList, setStudentList, handleChilderRender }}>
        {children}
    </AppContext.Provider>
  )
}
export const useApp = () => {
    return useContext(AppContext);
};