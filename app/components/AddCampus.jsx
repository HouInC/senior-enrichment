import React from 'react';
import { connect } from 'react-redux'
import { postCampus } from '../reducer'

const AddCampus = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label>name of campus</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ImageUrl</label>
                    <input
                        name="image"
                        type="url"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Sumbit</button>
            </form>
            <button type='submit' onClick={() => { props.history.goBack() }} >Cancel</button>
        </div>
    )
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: (event) => {
            event.preventDefault();
            const campus = {};
            campus[event.target.name.name] = event.target.name.value;
            if (event.target.image.value !== "") {
                campus[event.target.image.name] = event.target.image.value;
            }
            //console.log(campus);
            dispatch(postCampus(campus, ownProps.history));
            event.target.name.value = '';
            event.target.image.value = '';
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCampus);