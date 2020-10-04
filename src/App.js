import React from 'react';
import { connect } from 'react-redux';
import TaskCard from './cmps/TaskCard';
import { loadTasks, addTask, deleteTask, updateTask, startTask, updateTaskTrial, undoTasks } from './actions/taskActions.js';
import AddTask from './cmps/AddTask.jsx';
import socketService from './services/socketService';
import { Button } from '@material-ui/core';
const colors = ['D1EEF0', 'EEE5F0', 'C1D7C1', 'B9BDCB'];

class App extends React.Component {
  componentDidMount() {
    this.props.loadTasks();
    socketService.setup();
    socketService.on('task done', this.updateTaskTrial)
  }

  componentWillUnmount() {
    socketService.off('task done', this.updateTaskTrial);
    socketService.terminate();
  }

  updateTaskTrial = (taskStr) => {
    this.props.updateTaskTrial(JSON.parse(taskStr));
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

  getRandomColor = () => {
    const ind = parseInt(Math.random() * (colors.length));
    return '#' + colors[ind];
  }

  undoTasks = () => {
    this.props.undoTasks();
  }

  render() {
    if (!this.props.tasks) return <div>Loading</div>;
    return (

      <div className="App app-container">
        <h1>Task Manager</h1>
        <div className="tasks-container">
          {
            this.props.tasks.map((task, ind) =>
              <TaskCard task={task} key={ind} onDelete={this.onDelete} onEdit={this.onEdit} onStart={this.onStart} color={this.getRandomColor()} />
            )
          }
        </div>
        <AddTask onAddTask={this.onAddTask} onDelete={this.onDelete} />
        <Button onClick={this.undoTasks}>Undo tasks</Button>
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
  updateTaskTrial,
  undoTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
