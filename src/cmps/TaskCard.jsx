import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

export default function TaskCard(props) {
    const { task } = props;
    const [importance, setImportance] = React.useState(task.importance ? task.importance : 1);
    const colors = ['D1EEF0', 'EEE5F0', 'C1D7C1', 'B9BDCB'];

    function handleChange(ev){
        setImportance(ev.target.value);
    }

    function onEdit(){
        props.onEdit({...task, importance })
    }

    function getRandomColor(){
        const ind = parseInt(Math.random() * (colors.length));
        return '#' + colors[ind];
    }

    const editDisabled = task.importance === importance;
    return (
        <div style={{ backgroundColor: getRandomColor()}}>
        <Card variant="outlined" className="task-card">
            {task.done && <Chip label="Done" className="done" />}
            <CardHeader title={task.title} />
            <CardContent>
                <ul>
                    <li><PriorityHighIcon /> Importance: <input type="number" min="1" max="3" value={importance} onChange={handleChange} className="task-importance" /></li>
                   
                    <li><AccessTimeIcon />{new Date(task.createdAt).toLocaleString()}</li>
                    {task.triesCount && <li><AutorenewIcon /> Tries count: {task.triesCount}</li>}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" onClick={() => props.onDelete(task._id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" disabled={editDisabled} onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="start" disabled={task.done} onClick={() => props.onStart(task._id)}>
                    <PlayCircleFilledIcon/>
                </IconButton>
            </CardActions>
        </Card>
        </div>
    );
}
