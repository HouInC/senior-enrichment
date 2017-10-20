import React from 'react';
import { connect } from 'react-redux';
import { UpdateCampus,fetchStudent } from '../reducer';

//didn't use class to have a local state handle the form;

const EditCampus = (props) => {
    const id = props.match.params.id;
    const campus = props.campus.find(oneCampus => {
        return +oneCampus.id === +id;
    })
    return (
        <div>
            <form onSubmit={(event) => { props.handleSubmit(event, campus.id) }}>
                <div className="form-group">
                    <label>Current campus name: {campus && campus.name} , please leave blank to remain unchange</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder={campus && campus.name}
                    />
                </div>
                <div className="form-group">
                    <label>Current Image: {campus &&
                        <img src={campus.image} className='img' />
                    }</label>
                    <input
                        name="image"
                        type="url"
                        className="form-control"
                        placeholder={campus && campus.image}
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Submit</button>
            </form>
            <button type='submit' onClick={() => { props.history.goBack() }} >Cancel</button>
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
            //long because didn't use the local state;
            const newCampus = {};
            if (event.target.name.value) {
                newCampus[event.target.name.name] = event.target.name.value;
            }
            if (event.target.image.value) {
                newCampus[event.target.image.name] = event.target.image.value;
            }
            if (Object.keys(newCampus).length > 0) {
                dispatch(UpdateCampus(id, newCampus, ownProps.history));
            } else {
                alert('nothing update, redirect to the current campus page');
                ownProps.history.push(`/campus/${id}`);
            }
            event.target.name.value = '';
            event.target.image.value = '';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);