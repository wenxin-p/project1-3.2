import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import Checklist from "./checklist";
import MemoFunc from "./memo";

import Dropdown from "react-bootstrap/Dropdown";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CalendarFunc = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);

  //States for Checklist/Memo display.
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMemo, setShowMemo] = useState(false);

  // Function to select the date.
  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  // Function to handle Input Change.
  const handleEventInputChange = (event) => {
    setEventName(event.target.value);
  };

  // Allows users to create a new event.
  const handleEventCreation = (event) => {
    event.preventDefault();
    // Only accepts inputs that are not empty.
    if (selectedDate && eventName.trim() !== "") {
      const newEvent = {
        name: eventName,
        date: selectedDate,
      };
      setEvents([...events, newEvent]);
      setEventName("");
    }
  };

  // Allows users to delete a new task.
  const handleEventDel = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  //Countdown timer in days.
  const DaysLeftToEvent = (eventDate) => {
    const dateToday = new Date();
    const dateDiff = new Date(eventDate) - dateToday;
    //Conditions to determine whether d-day is here.
    return dateDiff > 0 ? Math.ceil(dateDiff / (1000 * 60 * 60 * 24)) : 0;
  };

  //Functions to trigger Checklist/memo on click.
  const handleChecklist = () => {
    setShowChecklist(true);
  };
  const handleMemo = () => {
    setShowMemo(true);
  };

  return (
    <div>
      <div>
        <Calendar
          value={selectedDate}
          onClickDay={handleDateSelection}
          key={({ date }) =>
            selectedDate && date.toDateString() === selectedDate.toDateString()
              ? "selected"
              : ""
          }
        />
      </div>
      <div>
        {selectedDate && (
          <div>
            <p>Selected Date: {selectedDate.toDateString()}</p>
            <input
              type="text"
              placeholder="Name of Event"
              value={eventName}
              onChange={handleEventInputChange}
            />
            <button onClick={handleEventCreation}>Add event</button>
          </div>
        )}
      </div>
      <div>
        <h2> 📅 Your Upcoming Events: </h2>
        <ul>
          <Container>
            {events.map((event, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
                <Row>
                  <Col>
                    <span style={{ flex: 1 }}>
                      <b>{event.date.toDateString()}</b> : {event.name} | {""}
                      {DaysLeftToEvent(event.date)} days left
                    </span>
                  </Col>
                </Row>
                <Col>
                  <button
                    onClick={() => handleEventDel(index)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ marginLeft: "10px" }}
                    >
                      Make A Note
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleChecklist}>
                        Checklist
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleMemo}>Memo</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                {/* Conditional rendering */}
                {(showChecklist || showMemo) && (
                  <Row>
                    {showChecklist && <Checklist />}
                    {showMemo && <MemoFunc />}
                  </Row>
                )}
              </li>
            ))}
          </Container>
        </ul>
      </div>
    </div>
  );
};

export default CalendarFunc;
