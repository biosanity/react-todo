import React, { useState } from "react";

const TodoInput = ({ createTodoItem }) => {
  const [input, setInput] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === "") {
      return console.log("Input cannot be blank");
    }
    createTodoItem(input);
    setInput("");
  };
  return (
    <div className="todo-input">
      <form onSubmit={handleSubmit}>
        <div className="field has-addons has-addons-centered">
          <div className="control ">
            <input
              type="text"
              placeholder="Content"
              className="input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <div className="control">
            <button className="button" onClick={handleSubmit}>
              + Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
