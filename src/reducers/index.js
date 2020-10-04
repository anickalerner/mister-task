import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import systemReducer from './systemReducer';

const rootReducer = combineReducers({
  systemReducer,
  taskReducer
})

export default rootReducer;