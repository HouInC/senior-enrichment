import React from 'react';
import { connect } from 'react-redux'
import { postStudent } from '../reducer'

const AddStudent = (props) => {
    const checked = props.match.params.id ? true : false;
    const id = props.match.params.id;
    if (props.campus.length > 0) {
        return (
            <div>
                <form onSubmit={(event)=>{props.handleSubmit(event,id)} }>
                    <div className="form-group">
                        <label>name</label>
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            required
                        />
                    </div>
                    {
                        !checked &&
                        <select className="form-control" name="id">
                            {
                                props.campus.map(campus => (
                                    <option key={campus.name} value={campus.id}>{campus.name}</option>
                                ))
                            }
                        </select>
                    }
                    <button type="submit" className="btn btn-block btn-primary">Sumbit</button>
                </form>
                <button type='submit' onClick={() => { props.history.goBack() }} >Cancel</button>
            </div>
        )
    } else {
        return (
            <div className='container'>
                <h1> No campus exist in the database </h1>
                <button type='submit' onClick={() => { props.history.goBack() }} >Go back to previous page</button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        campus: state.campus
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: (event,id) => {
            event.preventDefault();
            let campusId;
            if(id) {
                campusId=id;
            }else{
                campusId=event.target.id.value;
            }

            const Student = {
                name: event.target.name.value,
                email: event.target.email.value,
                campusId
            }
            dispatch(postStudent(Student, ownProps.history));
            event.target.name.value = '';
            event.target.email.value = '';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);