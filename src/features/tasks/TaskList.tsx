import Stack from "react-bootstrap/Stack";
import { Task } from "./Task";
import { TaskCard } from "./TaskCard";

export interface TaskListProps {
    tasks: Task[],
}

export function TaskList(props: TaskListProps) {
    return <Stack>
        {props.tasks.map((task: Task) => <TaskCard task={task} />)}
    </Stack>
}
