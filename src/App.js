import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const Local_KEY = 'todoKey'

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(Local_KEY))
    if(storedTodos) setTodos(storedTodos)
 }, []) 

  useEffect(() => {
    localStorage.setItem(Local_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = ! todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
     const name = todoNameRef.current.value
     if (name === '' ) return
     setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
     });
     console.log(uuidv4());
     todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (
    // <> called a fragment is used becuase you cannot return 2 jsx ellements next to eachother 
    <> 
    <TodoList todos={todos} toggleTodo={toggleTodo }/> 
    <input ref={todoNameRef } type="text" />
    <button onClick={handleAddTodo}>Add</button>
    <button onClick={handleClearTodos}>Clear</button>
  <p>{todos.filter(todo => !todo.complete).length}</p>
    </>
  )

}

export default App;
