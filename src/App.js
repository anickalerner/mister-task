import React from 'react';
import { connect } from 'react-redux';
import TaskCard from './cmps/TaskCard';
import { loadTasks, addTask, deleteTask, updateTask, startTask, markDone } from './actions/taskActions.js';
import AddTask from './cmps/AddTask.jsx';
import socketService from './services/socketService';

class App extends React.Component {
  componentDidMount() {
    this.props.loadTasks();
    socketService.setup();
    socketService.on('task done', this.markDone)
  }

  componentWillUnmount() {
    socketService.off('task done', this.markDone);
    socketService.terminate();
  }

  markDone = (id) => {
    console.log('socket responded');
    this.props.markDone(this.props.tasks, id);
  }

  onAddTask = (title) =>{
    this.props.addTask({title})
  }

  onDelete = (id) =>{
    this.props.deleteTask(id);
  }

  onEdit = (task) =>{
    this.props.updateTask(task);
  }

  onStart = (id) =>{
    this.props.startTask(id);
  }
  render() {
    if (!this.props.tasks) return <div>Loading</div>;
    return (

      <div className="App app-container">
        <h1>Task Manager</h1>
        <div className="tasks-container">
          {
            this.props.tasks.map((task, ind) =>
              <TaskCard task={task} key={ind} onDelete={this.onDelete} onEdit={this.onEdit} onStart={this.onStart} />
            )
          }
        </div>
        <AddTask onAddTask={this.onAddTask} onDelete={this.onDelete} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.taskReducer.tasks
  };
};
const mapDispatchToProps = {
  loadTasks,
  addTask,
  deleteTask,
  updateTask,
  startTask,
  markDone
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
