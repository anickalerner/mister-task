import taskService from '../services/taskService';

export function loadTasks() {
  return async dispatch => {
    try {
      const tasks = await taskService.query();
      dispatch({ type: 'SET_TASKS', tasks });

    } catch (err) {
      console.log('TaskActions: err in loadTasks', err);
    }
  };
}

export function addTask(task) {
  return async dispatch => {
    try {
      const addedTask = await taskService.add(task);
      dispatch({ type: 'ADD_TASK', task: addedTask });
    } catch (err) {
      console.log('TaskActions: err in addTask', err);
    }
  };
}

export function deleteTask(id){
  return async dispatch => {
    try {
      await taskService.remove(id);
      dispatch({ type: 'DELETE_TASK', removedTaskId: id });
    } catch (err) {
      console.log('TaskActions: err in deleteTask', err);
    }
  };
}

export function updateTask(task) {
  return async dispatch => {
    try {
      await taskService.update(task);
      dispatch({ type: 'UPDATE_TASK', task });
    } catch (err) {
      console.log('TaskActions: err in updateTask', err);
    }
  };
}

export function startTask(id){
  return async dispatch => {
    try {
      const task = await taskService.start(id);
      dispatch({ type: 'START_TASK', task });
    } catch (err) {
      console.log('TaskActions: err in startTask', err);
    }
  };
}

export function markDone(tasks, id){
  return dispatch => {
    try {
      var task = tasks.find(task => task._id === id);
      dispatch({ type: 'MARK_DONE', task: {...task, done: true} });
    } catch (err) {
      console.log('TaskActions: err in markDone', err);
    }
  };
}
