import React from 'react';
import './style.css';
import ToDoItem from "./ToDoItem"
  
function AppToDo() {
    return (  
      <div className="todo-list">
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </div>
    )
  }


export default AppToDo