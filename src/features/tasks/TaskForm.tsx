import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { DynamicEntity } from "../dynamic-entity/DynamicEntity";
import { useCreateTaskMutation, useGetDynamicEntitiesQuery } from "../../app/api";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { Task } from "./Task";

export interface TaskFormProps {
}

export function TaskForm(props: TaskFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [destinationX, setDestinationX] = useState("");
    const [destinationY, setDestinationY] = useState("");
    const [destinationZ, setDestinationZ] = useState("");
    const [assignedRobotId, setAssignedRobotId] = useState("");

    const [createTaskTrigger, createTaskResult] = useCreateTaskMutation();
    const getDynamicEntitiesResponse = useGetDynamicEntitiesQuery(undefined, {
        pollingInterval: 1000,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const task: Task = {
            name,
            payloadId: "",
            payloadDestination: {
                X: Number(destinationX),
                Y: Number(destinationY),
                Z: Number(destinationZ),
            },
            assignedRobotId: assignedRobotId !== "" ? assignedRobotId : undefined,
        };

        createTaskTrigger(task);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {open
                    ? <Row>
                        <Col>
                            <button type="button" disabled={createTaskResult.isLoading} onClick={() => setOpen(false)} className="btn w-100 btn-outline-primary">Cancel</button>
                        </Col>
                        <Col>
                            <button type="submit" disabled={createTaskResult.isLoading} className="btn w-100 btn-primary">{createTaskResult.isLoading ? <Spinner /> : "Submit"}</button>
                        </Col>
                    </Row>
                    : <Row>
                        <Col>
                            <button type="button" onClick={() => setOpen(true)} className="btn w-100 btn-primary">Create Task</button>
                        </Col>
                    </Row>}
                <Collapse in={open}>
                    <Container>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Task Name" disabled={createTaskResult.isLoading} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Destination</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control type="number" placeholder="X" disabled={createTaskResult.isLoading} onChange={(e) => setDestinationX(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder="Y" disabled={createTaskResult.isLoading} onChange={(e) => setDestinationY(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Control type="number" placeholder="Z" disabled={createTaskResult.isLoading} onChange={(e) => setDestinationZ(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Robot</Form.Label>
                            <Form.Select value={assignedRobotId} disabled={createTaskResult.isLoading} onChange={(e) => setAssignedRobotId(e.target.value)}>
                                <option hidden>Select Robot</option>
                                {getDynamicEntitiesResponse.data
                                    ? getDynamicEntitiesResponse.data.map((robot: DynamicEntity) => <option value={robot.id}>{robot.name}</option>)
                                    : <option>No robots available</option>}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                </Collapse>
            </Form>
        </>
    )
}