import '../Task/Task.css';

function Task( {title, body, id, lane, onDragStart}) {
    return (
        <div 
            className='Task-wrapper' 
            draggable='true'
            onDragStart={(event) => onDragStart(event, id)}
        >
            <h3>{title}</h3>
            <p>{body}</p>
            <p>ID: <b>{id}</b> </p>
            <p>Lane: <b>{lane}</b> </p>
        </div>
    )
}

export default Task;