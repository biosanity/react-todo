import React, { useState, useEffect } from "react";

import "./App.scss";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";

const App = () => {
  const storedTodoItems = localStorage.getItem("todoItems");
  const initialTodoItems = storedTodoItems ? JSON.parse(storedTodoItems) : [];

  const [todoItems, setTodoItems] = useState(initialTodoItems);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  const createTodoItem = (todo) => {
    const newTodoItems = [...todoItems, { todo, complete: false }];
    setTodoItems(newTodoItems);
  };

  const updateTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    const item = newTodoItems[index];
    let newItem = prompt(`Update $item.todo?`, item.todo);

    if (newItem === null || newItem === "") {
      return;
    } else {
      item.todo = newItem;
    }

    setTodoItems(newTodoItems);
  };

  const updateTodoItemStatus = (index) => {
    const newTodoItems = [...todoItems];

    newTodoItems[index].complete === false
      ? (newTodoItems[index].complete = true)
      : (newTodoItems[index].complete = false);
    setTodoItems(newTodoItems);
  };

  const deleteTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  return (
    <div className="app container is-max-desktop">
      <h1 className="mb-2 is-size-2 has-text-white has-text-centered">
        To-do App
      </h1>
      <TodoInput createTodoItem={createTodoItem} />
      {todoItems.map((item, index) => (
        <TodoItem
          key={index}
          index={index}
          item={item}
          deleteTodoItem={deleteTodoItem}
          updateTodoItem={updateTodoItem}
          updateTodoItemStatus={updateTodoItemStatus}
        />
      ))}
    </div>
  );
};

export default App;
