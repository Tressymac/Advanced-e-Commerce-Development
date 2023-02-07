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

    useEffect(() => {setTasks(taskdata)}, [taskdata]);

    return(
        <div className='Board-wrapper'>
            {lanes.map( (lane) => (
                <Lane 
                    key={lane.id} 
                    title={lane.title}
                    loading={loading}
                    error={error}
                    tasks={tasks.filter((task) => task.lane === lane.id)}
                />
            ) )}
        </div>
    )
}

export default Board;