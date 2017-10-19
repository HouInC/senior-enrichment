import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteStudent } from '../reducer';

const AllStudent = (props) => {
    let counter=0;
    return (
        <div>
        <Link to="/student/add">
            <button className='btn btn-success' type="Submit">Add Student</button>
        </Link>
        <table className="table">
        <thead>
        <tr>
        <th>#</th>
        <th>StudentId</th>
        <th>name :</th>
        <th>campus</th>
        <th>Email</th>
        <th>view</th>
        <th>Edit</th>
        <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {
            props.students.map(student => (
                <tr key={student.id}>
                <th scope="row">{++counter}</th>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.campus.name}</td>
                <td>{student.email}</td>
                <td> <Link to={`/student/${student.id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
                <td>
                    <button type='submit'>
                        <Link to={`/student/edit/${student.id}`} >
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </Link>
                    </button>
                </td>
                <td><button type='sumbit' onClick={()=>{props.handleClick(student.id)}}>x</button></td>
                </tr>
            ))
        }
        </tbody>
        </table>
        </div>
    )
}
    
const mapStateToProps = (state) =>{
    return {
        students : state.student,
        campus : state.campus
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        handleClick : (id)=>{
            dispatch(deleteStudent(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStudent);