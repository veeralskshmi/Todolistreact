import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const defaultTodos = [
{id:1, text:'Book', completed:false},
{id:2, text :'Notes', completed:false}
];

function App()
{
  const initialTodos = () => {
    const storedTodos = JSON.parse (localStorage.getItem ('todos'));

    if(!storedTodos || storedTodos.length === 0){
      return defaultTodos;
    }
    return storedTodos;
  };


  const[todos, setTodos] = useState([]);

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if(storedTodos)
      {
        setTodos(storedTodos);
      }
  }, []);

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos]);

  const addTodo= (text) => {
    const newTodo = {id:Date.now(), text, completed:false};
    setTodos([...todos, newTodo]);
  };

  const toggleTodo=(id) =>{
    const updatedTodos =todos.map(todo =>
      todo.id === id ? {...todo, completed:!todo.completed}:todo

    );
    setTodos(updatedTodos);
  };


  const deleteTodo=(id) =>{
    const updatedTodos= todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return(
    <div className="App">
      <h1>TodoList</h1>
      <TodoForm addTodo = {addTodo} />
      <TodoList todos = {todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );


}
export default App;
