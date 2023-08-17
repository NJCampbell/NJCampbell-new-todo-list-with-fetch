import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [id, setId] = useState(1);

  //add a task 
  function handleAddTask() {
    const newTaskItem = {
      id: id,
      label: newTask,
    };
    setTask((previousTask) => [...previousTask, newTaskItem]);
    setNewTask("");
    setId((id) => id + 1);
  }
  function assignNewTask() {
    let newTaskList = [...task, { label: newTask, done: false }];
    fetch("https://playground.4geeks.com/apis/fake/todos/user/njcamp", {
      method: "PUT",
      body: JSON.stringify(newTaskList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error(error));
  }

  //delete a task  
  function fetchDeleteOneTask(id) {
    const newList = task.filter((task, currentId) => id !== currentId);
    fetch("https://playground.4geeks.com/apis/fake/todos/user/njcamp", {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then(() => console.log("Successfully deleted"))
    function handleDeleteTask() {
      function deleteSingleTask(previousTask) {
        return previousTask.filter((task) => task.id !== id);
      }
      setTask(deleteSingleTask);
    }
    handleDeleteTask()
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      assignNewTask();
      handleAddTask();
    }
  }
  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/njcamp")
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, []);

  return (
    <>
      <div className="todo-wrapper">
        <div className="todo-header">
          <h1>todos</h1>
        </div>
        <div className="todo-body">
          <input
            className="controlled-input"
            type="text"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <div className="list-container">
            <ul>
              {task.map((task) => (
                <TodoList

                  key={task.id}
                  task={task}
                  fetchDeleteOneTask={fetchDeleteOneTask}
                />
              ))}
            </ul>
            <TodoFooter task={task} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
