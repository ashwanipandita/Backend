const EventEmitter = require("events");
const event = new EventEmitter();
const handlerFunction = () => {
    console.log("Hello");

};

const byeEventhandlerFunction = ()=>{
    console.log("Bye")
};

// Create Event
event.on("HelloEvent", handlerFunction);

// Another Event Created
event.on("ByeEvent", byeEventhandlerFunction);

// emit(call) emit
event.emit("HelloEvent");

// Emitting Second Event

event.emit("ByeEvent")