import axios from 'axios';
import { fetchStudent } from './'
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';


export const getCampus = (campus) => {
    return {
        type: GET_CAMPUS,
        campus
    }
}

export const addCampus = (campus) => {
    return {
        type: ADD_CAMPUS,
        campus
    }
}

export const removeCampus = (id) => {
    return {
        type: REMOVE_CAMPUS,
        id
    }
}

export const editCampus = (campus) => {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}

export function fetchCampus() {
    return function (dispatch) {
        return axios.get('/api/campus')
            .then(res => res.data)
            .then(campus => {
                campus.sort((a, b) => a.id - b.id)
                const action = getCampus(campus);
                dispatch(action);
            });
    };
}

export function postCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.post('/api/campus/add', campus)
            .then(res => res.data)
            .then(newCampus => {
                dispatch(addCampus(newCampus));
                history.push(`/campus`);
            });
    };
}

export function deleteCampus(id, history) {
    return function (dispatch) {
        dispatch(removeCampus(id));
        axios.delete(`/api/campus/${id}`)
            .then(() => {
                dispatch(fetchStudent());
            })
            .catch(console.error);
        history.push('/');
        return;
    }
}

export function UpdateCampus(id, campus, history) {
    return function (dispatch) {
        axios.put(`/api/campus/${id}`, campus)
            .then(res => res.data)
            .then(updatedCampus => {
                dispatch(editCampus(updatedCampus));
            })
            .then(() => {
                dispatch(fetchStudent());
            })
            .catch(console.error)
        history.push(`/campus/${id}`);
        return;
    }
}

export default function reducer(campuses = [], action) {
    switch (action.type) {
        case GET_CAMPUS:
            return action.campus;
        case ADD_CAMPUS:
            return campuses.concat(action.campus);
        case REMOVE_CAMPUS:
            return campuses.filter(campus => {
                return +campus.id !== +action.id
            })
        case UPDATE_CAMPUS:
            return campuses.map(campus => {
                return campus.id === action.campus.id ? action.campus : campus;
            })
        default:
            return campuses;
    }

}
