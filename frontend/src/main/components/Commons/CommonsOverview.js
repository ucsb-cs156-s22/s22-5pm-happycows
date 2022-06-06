import React from "react";
import { Button, Card } from "react-bootstrap";

export default function CommonsOverview({ commons }) {
    // Stryker disable all
    const dayNumber = Math.ceil((new Date().getTime() - new Date(commons.startingDate).getTime())/86400000);
    // Stryker enable all
    const endingDate = new Date(commons.endingDate).toLocaleDateString();
    return (
        <Card data-testid="CommonsOverview">
            <Card.Header as="h5">Announcements</Card.Header>
            <Card.Body>
                <Card.Title>Today is day {dayNumber}! This game will end on {endingDate}.</Card.Title>
                <Card.Text>Total Players: {commons.totalPlayers}</Card.Text>
                <Button href={`/leaderboard/${commons.id}`}>Leaderboard</Button>
            </Card.Body>
        </Card>
    );
}; 