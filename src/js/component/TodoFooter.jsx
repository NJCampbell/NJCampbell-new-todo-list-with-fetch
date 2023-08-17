import React from "react";

const TodoFooter = ({ task }) => {
  return (
    <>
      <div className="todo-footer">
        <p>{task.length} tasks left</p>
      </div>
    </>
  );
};

export default TodoFooter;
