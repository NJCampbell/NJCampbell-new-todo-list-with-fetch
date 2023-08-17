import React from "react";

const TodoList = ({ task, fetchDeleteOneTask }) => {
  return (
    <>
      <div className="list-items">
        <li key={task.id}>
          {task.label}

          <button
            className="delete-button"
            onClick={() => fetchDeleteOneTask(task.id)}
          >
            X
          </button>
        </li>
      </div>
    </>
  );
};

export default TodoList;
