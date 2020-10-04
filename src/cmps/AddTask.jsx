import { Button, TextField } from '@material-ui/core'
import React from 'react'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function AddTask(props) {
    const [title, setTitle] = React.useState('');
    const fieldRef = React.createRef();
    function submitForm(ev){
        ev.preventDefault();
        props.onAddTask(title);
        fieldRef.current.value = '';
    }
    function handleInput(ev){
        setTitle(ev.target.value);
    }
    return (
        <div className="add-task">
            <form noValidate autoComplete="off" onSubmit={submitForm} className="flex row">
                <Button type="submit" 
                variant="contained" 
                startIcon={<AssignmentTurnedInIcon/>} 
                className="add-task-btn">Add task</Button>
                <TextField id="outlined-basic" label="Task title" variant="outlined" onKeyUp={handleInput} inputRef={fieldRef}/>
            </form>
        </div>
    )
}
