import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { dateToString, position3dToString } from "../Utils";
import { Task } from "./Task";

export interface TaskCardProps {
    task: Task,
}

export function TaskCard(props: TaskCardProps) {
    return <Card className="p-1 mb-3">
        <Card.Body>
            <Card.Title>{props.task.name}</Card.Title>
        </Card.Body>
        <ListGroup>
            <ListGroup.Item><>Created: {props.task.creationDate ? dateToString(props.task.creationDate) : "Unknown"}</></ListGroup.Item>
            <ListGroup.Item><>Destination: {position3dToString(props.task.payloadDestination)}</></ListGroup.Item>
            <ListGroup.Item><>Assigned Robot: {props.task.assignedRobotId}</></ListGroup.Item>
        </ListGroup>
    </Card>
}