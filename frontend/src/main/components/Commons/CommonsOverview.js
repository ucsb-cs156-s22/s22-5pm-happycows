import React from "react";
import { Card } from "react-bootstrap";

export default function CommonsOverview({ commons }) {
    return (
        <Card data-testid="CommonsOverview">
            <Card.Header as="h5">Announcements</Card.Header>
            <Card.Body>
                <Card.Title>Today is day {Math.ceil((new Date().getTime() - new Date(commons.startingDate).getTime())/1000/60/60/24)}! This game will end on {new Date(commons.endingDate).toLocaleDateString()}.</Card.Title>
                <Card.Text>Total Players: {commons.totalPlayers}</Card.Text>
            </Card.Body>
        </Card>
    );
}; 