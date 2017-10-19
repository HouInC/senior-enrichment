import axios from 'axios';

const GET_STUDENT = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const updateStudent = student => {
    return{
        type : UPDATE_STUDENT,
        student
    }
}

export const removeStudent= id =>{
    return {
        type: REMOVE_STUDENT,
        id
    }
}

export const getStudent = (student) => {
    return {
        type: GET_STUDENT,
        student
    }
}

export const addStudent = (student) => {
    return {
        type: ADD_STUDENT,
        student
    }
}

export function deleteStudent(id) {
    return function(dispatch){
        dispatch(removeStudent(id));
        return axios.delete(`/api/student/${id}`)
            .catch(err=>{
                console.error('student remove unsuccessful');
            })
    }
}

export function fetchStudent() {
    return function (dispatch) {
        return axios.get('/api/student')
            .then(res => res.data)
            .then(allStudent => {
                allStudent.sort((a,b)=>{
                    return a.id - b.id
                })
                const action = getStudent(allStudent);
                dispatch(action);
            });
    };
}



export function postStudent(student, history) {
    return function thunk(dispatch) {
        return axios.post('/api/student/add', student)
            .then(res => res.data)
            .then(newStudent => {
                //newStudent only have campus ID instead of whole campus object
                dispatch(addStudent(newStudent));
                //dispatch(fetchStudent());
                history.push(`/campus/${newStudent.campusId}`);
            });
    };
}

export function UpdateStudent(id,student,history){
    return function(dispatch){
        return axios.put(`/api/student/${id}`,student)
            .then(res=>res.data)
            .then(updatedStudent=>{
                //console.log(updatedStudent);
                dispatch(updateStudent(updatedStudent));
                history.push(`/student/${id}`);
            })
    }
}

export default function reducer (students = [], action) {
      switch (action.type) {
        case GET_STUDENT:
          return action.student;
        case ADD_STUDENT:
          return students.concat(action.student);
        case REMOVE_STUDENT:
          return students.filter(student=> student.id !== action.id);
        case UPDATE_STUDENT:
            return students.map(student=>{
                return student.id===action.student.id ? action.student : student;
            })
        default:
          return students;
      }
}