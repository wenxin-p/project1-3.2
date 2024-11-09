import { useState } from "react";

function MemoFunc() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editNote, setEditNote] = useState(false);
  const [isAddTaskCompleted, setIsAddTaskCompleted] = useState(false);

  // Handle input change.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Allows users to add a new note.
  const handleAddNote = (event) => {
    event.preventDefault();
    // Only accepts input that is not empty
    if (inputValue.trim() !== "") {
      setNotes(inputValue);
      setInputValue("");
    }
  };

  // Allow users to edit the note.
  const handleEditNote = () => {
    setInputValue(notes);
    setEditNote(true);
  };

  //Allow user to choose between editing memo or be done with adding.
  const handleCompleteAdding = () => {
    setIsAddTaskCompleted(true);
  };

  const handleRestartAdding = () => {
    setIsAddTaskCompleted(false);
  };

  // Allows users to remove note.
  const handleRemoveNote = () => {
    setNotes("");
    setInputValue("");
    setEditNote(false);
  };

  return (
    <div>
      {!isAddTaskCompleted && (
        <form onSubmit={handleAddNote}>
          <textarea
            name="content"
            rows={5}
            cols={40}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new note"
          />
          <button>{editNote ? "Update Note" : "Add Note"}</button>
        </form>
      )}
      <div>
        <h4>✎ᝰ Memo:</h4>
        <p>{notes}</p>
        {/* Conditional Rendering */}
        {!isAddTaskCompleted && (
          <button onClick={handleEditNote} style={{ marginRight: "10px" }}>
            Edit
          </button>
        )}
        {!isAddTaskCompleted && (
          <button onClick={handleRemoveNote}>Remove</button>
        )}
      </div>

      {!isAddTaskCompleted && (
        <button onClick={handleCompleteAdding} style={{ marginTop: "10px" }}>
          Done
        </button>
      )}

      {isAddTaskCompleted && (
        <button onClick={handleRestartAdding} style={{ marginTop: "10px" }}>
          Edit Note
        </button>
      )}
    </div>
  );
}

export default MemoFunc;
