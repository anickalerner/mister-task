const initialState = {
  tasks: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TASKS':
    case 'UNDO_TASKS':
      return { ...state, tasks: action.tasks };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task._id !== action.removedTaskId)}
    case 'UPDATE_TASK':
    case 'START_TASK':
    case 'MARK_DONE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.task._id ? action.task : task
        )};
    default:
      return state;
  }
}
