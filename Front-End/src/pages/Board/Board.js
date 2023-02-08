import { useState, useEffect } from 'react';
import useTaskFetcher from '../../hook/useTaskFetcher.js';
import axios from 'axios';

import Lane from '../../components/Lane/Lane.js';
import '../Board/Board.css';

const lanes = [
    { id: 1, title: 'Backlog' },
    { id: 2, title: 'To Do' },
    { id: 3, title: 'Doing' },
    { id: 4, title: 'Done' }
]

function Board( {apiURL} ) {
    const [tasks, setTasks] = useState([]);
    const [loading, error, taskdata] = useTaskFetcher(apiURL+ `/tasks`);
    const [modifiedTask, setModifiedTask] = useState(null);

    useEffect(() => {
        console.log("I'm in the useEffect hook!");
        console.log(modifiedTask);

        // Define a function that calls the API with the updated task
        const updateTask = async (task) => {
            try {
                delete task._id;
                const apiResponse = await axios.patch(apiURL + '/tasks/' + task.id, task)
                await console.log(apiResponse.data);
            } catch (err) {
                console.error(err);
            }
        }

        if (modifiedTask != null) {
            // This is where I want to write the code to change the task via the API
            updateTask(modifiedTask);
        } else {
            console.log('Modified task is null');
        }

        return () => {
            setModifiedTask(null);
        }

    }, [apiURL, modifiedTask]);

    //Event Handlers for dragging 
    function onDragStart(event, taskId) {
        console.log('ID of task being dragged: ' + taskId);
        event.dataTransfer.setData('taskId', taskId);
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDrop(event, laneId) {
        // Retrieve the id of the task being dropped
        const taskId = event.dataTransfer.getData('taskId');
        console.log('Task ' + taskId + ' goes to Lane ' + laneId);

        // Update the list of tasks in state with the updated version of the dropped task
        const updatedTasks = tasks.filter((task) => {
            // IF the current task is the task that was dropped, update its lane id
            if (task.id.toString() === taskId) {
                task.lane = laneId;
                setModifiedTask(task);
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    useEffect(() => {setTasks(taskdata)}, [taskdata]);

    return(
        <div className='Board-wrapper'>
            {lanes.map( (lane) => (
                <Lane 
                    key={lane.id} 
                    laneId={lane.id}
                    title={lane.title}
                    loading={loading}
                    error={error}
                    tasks={tasks.filter((task) => task.lane === lane.id)}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                />
            ) )}
        </div>
    )
}

export default Board;