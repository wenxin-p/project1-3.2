import { useState } from "react";

function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editTask, setEditTask] = useState(false);
  const [currTaskIndex, setCurrTaskIndex] = useState(null);
  const [isAddTaskCompleted, setIsAddTaskCompleted] = useState(false);

  // Handle input change.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Allows users to add a new task.
  const handleAddTask = (event) => {
    event.preventDefault();
    // Only accepts inputs that are not empty.
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  // Allows the selected task to be edited.
  const handleEditTask = (index) => {
    setInputValue(tasks[index]);
    setEditTask(true);
    setCurrTaskIndex(index);
  };

  // Allows the task to be edit and input updated.
  const handleUpdateTask = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const taskList = [...tasks];
      //Update the selected task with new input.
      taskList[currTaskIndex] = inputValue;
      setTasks(taskList);
      setEditTask(false);
      setCurrTaskIndex(null);
      setInputValue("");
    }
  };

  // Allows users to remove a task.
  const handleRemoveTask = (index) => {
    const taskList = tasks.filter((_, i) => i !== index);
    setTasks(taskList);
  };

  //Allow users to choose between adding more tasks or be done with adding tasks.
  const handleCompleteAdding = () => {
    setIsAddTaskCompleted(true);
  };

  const handleContAdding = () => {
    setIsAddTaskCompleted(false);
  };

  return (
    <div>
      <h4> ✔ Checklist</h4>
      {!isAddTaskCompleted && (
        <form onSubmit={editTask ? handleUpdateTask : handleAddTask}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={editTask ? "Edit task" : "Enter a new task"}
          />
          <button>{editTask ? "Update Task" : "Add Task"}</button>
        </form>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ flex: 1 }}>{task}</span>
            {!isAddTaskCompleted && (
              <button
                onClick={() => handleEditTask(index)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
            )}
            {!isAddTaskCompleted && (
              <button
                onClick={() => handleRemoveTask(index)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Conditional Rendering */}
      {!isAddTaskCompleted && tasks.length > 0 && (
        <button onClick={handleCompleteAdding} style={{ marginTop: "10px" }}>
          Done
        </button>
      )}

      {isAddTaskCompleted && (
        <button onClick={handleContAdding} style={{ marginTop: "10px" }}>
          Add More Tasks
        </button>
      )}
    </div>
  );
}

export default Checklist;
