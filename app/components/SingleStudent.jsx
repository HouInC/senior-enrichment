import React from 'react';
import { connect } from 'react-redux';

const SingleStudent=(props) => {
    const id = props.match.params.id;
    const student = props.students.find(oneStudent=>{
        return +oneStudent.id === +id;
    })
    return (
        <div className='container'>
            <h1>Campus: {student && student.campus.name}</h1>
            <h1>StudentId: { student && student.id}</h1>
            <h1>StudentName : {student && student.name}</h1>
            <h2>Student Email:{student && student.email}</h2>
            <button type='submit' onClick={() => { props.history.goBack() }} >Go Back to previous page</button>
        </div>
    )
}


const mapStateToProps=(state) => {
    return {
        students : state.student,
        campus : state.campus
    }
}

export default connect(mapStateToProps)(SingleStudent);


