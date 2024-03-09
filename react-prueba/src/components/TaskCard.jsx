export function TaskCard({ task }) {
    return (
        <div>
            <h1>{task.name}</h1>
            <img src={task.image}></img>
            <hr />
        </div>
    );
}
