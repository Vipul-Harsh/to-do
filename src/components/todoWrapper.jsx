import React , { useState , useEffect } from "react";
import { TodoForm }from "./todoform";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from "./todo";
import { EditTodoForm } from "./editTodoForm";
uuidv4();


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() === "") return;
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const updateTodo = (newTask, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) =>
    sortAsc
      ? a.task.localeCompare(b.task)
      : b.task.localeCompare(a.task)
  );

  const filteredTodos = filterCompleted
    ? sortedTodos.filter((todo) => todo.completed)
    : sortedTodos;

  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    <div className="TodoWrapper">
      <h1>Todo List</h1>                                                                                                                                                                                                                                                                                                                                     
      <TodoForm addTodo={addTodo} />
      <div className="controls">
        <button  className="todo-btn-show" onClick={() => setSortAsc(!sortAsc)}>
          {sortAsc ? "Sort Descending" : "Sort Ascending"}
        </button>
        <button className="todo-btn-show" onClick={() => setFilterCompleted(!filterCompleted)}>
          {filterCompleted ? "Show All" : "Show Completed"}
        </button>
      </div>
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={updateTodo} task={todo} />
        ) : (
          <Todo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}                                                                                                                                                                                                                                                               
          />
        )
      )}
    </div>
  );
};
  

