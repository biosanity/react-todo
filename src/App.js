import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";

const App = () => {
  const storedTodoItems = localStorage.getItem("todoItems");
  const initialTodoItems = storedTodoItems ? JSON.parse(storedTodoItems) : [];

  const [todoItems, setTodoItems] = useState(initialTodoItems);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const newTodoItems = [...todoItems];
      const [removedItem] = newTodoItems.splice(source.index, 1);
      newTodoItems.splice(destination.index, 0, removedItem);

      setTodoItems(newTodoItems);
    }
  };

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  const createTodoItem = (todo) => {
    const newTodoItems = [
      ...todoItems,
      { id: uuidv4(), todo, complete: false },
    ];
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
      <DragDropContext onDragEnd={handleDragDrop}>
        <TodoInput createTodoItem={createTodoItem} />
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoItems.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <TodoItem
                        key={index}
                        index={index}
                        item={item}
                        deleteTodoItem={deleteTodoItem}
                        updateTodoItem={updateTodoItem}
                        updateTodoItemStatus={updateTodoItemStatus}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
