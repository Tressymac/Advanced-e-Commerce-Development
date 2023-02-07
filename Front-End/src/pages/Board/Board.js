import { useState, useEffect } from 'react';
import useTaskFetcher from '../../hook/useTaskFetcher.js';

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

    //Event Handlers for dragging 
    function onDragStart(event, taskId){
        console.log('ID of task being dragged: ' + taskId)
        event.dataTransfer.setData('taskid', taskId)
    }

    function onDragOver(event){
        event.preventDefault();
    }

    function onDrop(event, laneId){
        //Retrive the id of the task being dropped
        const taskId = event.dataTransfer.getData('taskId');
        console.log('Task ' + taskId + ' goes to lane ' + laneId);

        //uodate the list of task in state with the updated version of the dropped task
        const updatedTasks = tasks.filter((task) => {
            //If the current task is the task that was dropped, then update its lane ID
            if(task.id.toString() === taskId){
                task.lane = laneId
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