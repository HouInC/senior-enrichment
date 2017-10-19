import React from 'react';
import { connect } from 'react-redux';
import { UpdateStudent } from '../reducer';

const EditStudent = (props) => {
    const id = props.match.params.id;
    const student = props.students.find(oneStudent => {
        return +oneStudent.id === +id;
    })
    return (
        <div>
            <form onSubmit={(event) => { props.handleSubmit(event, student.id) }}>
                <div className="form-group">
                    <label>Current name: {student && student.name} , please leave blank to remain unchange</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder={student && student.name}
                    />
                </div>
                <div className="form-group">
                    <label>Current email: {student && student.email}</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder={student && student.email}
                    />
                </div>
                <div className="form-group">
                    <label>Current Campus: {student && student.campus.name}</label>
                    <select className="form-control" name="campusId">
                        <option value={'select'}>select</option>
                        {
                            (props.campus.length >0 && student) &&
                            props.campus.filter(campus=>{
                                return +campus.id !== student.campusId; 
                            }).map(campus => (
                                <option key={campus.name} value={campus.id}>{campus.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-block btn-primary">Sumbit</button>
            </form>
            <button type='submit' onClick={()=>{props.history.goBack()}} >Cancel</button>
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
        handleSubmit: (event, id) => {
            event.preventDefault();
            const newStudent = {};
            if (event.target.name.value) {
                newStudent[event.target.name.name] = event.target.name.value;
            }
            if (event.target.email.value) {
                newStudent[event.target.email.name] = event.target.email.value;
            }
            if (event.target.campusId.value !== 'select') {
                newStudent[event.target.campusId.name] = event.target.campusId.value;
            }
            if (Object.keys(newStudent).length > 0) {
                dispatch(UpdateStudent(id, newStudent, ownProps.history));
            } else {
                alert('nothing update, redirect to homepage');
                ownProps.history.push(`/student/{id}`);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);