import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteStudent, deleteCampus , fetchStudent } from '../reducer'

const singleCampus = (props) => {
    const id = props.match.params.id;
    const student = props.students.filter(oneStudent => {
        return +oneStudent.campusId === +id;
    })
    const campus = props.campus.find(oneCamps => {
        return +oneCamps.id === +id;
    })
    let counter = 0;
    return (
        <div>
            <label> delete the current campus :
            <button type='submit' onClick={() => { props.handleRemove(id) }}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </label>
            <label> Edit the current campus :
            <Link to={`/campus/edit/${id}`}><button><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
            </label>
            <h1>{campus && campus.name}</h1>
            <img src={campus && campus.image} className='img' />
            <Link to={`/campus/add/student/${id}`}>
                <button className='btn btn-success' type="Submit">Add Student</button>
            </Link>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>StudentId</th>
                        <th>name :</th>
                        <th>email</th>
                        <th>view</th>
                        <th>edit</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((student, index) => (
                            <tr key={index}>
                                <th scope="row">{++counter}</th>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td> <Link to={`/student/${student.id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
                                <td><button type='submit'>
                                    <Link to={`/student/edit/${student.id}`} >
                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </Link>
                                </button></td>
                                <td><button type='submit' onClick={() => { props.handleClick(student.id) }}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        students: state.student,
        campus: state.campus
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (id) => {
            dispatch(deleteStudent(id));
        },
        handleRemove: (id) => {
            dispatch(deleteCampus(id, ownProps.history));
            // dispatch(fetchStudent());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleCampus);