import { combineReducers } from 'redux';
import campus from './campus';
import student from './student'

const reducer = combineReducers({
  campus,
  student
})

export default reducer;
export * from './campus';
export * from './student';