import { useEffect, useState } from 'react'
import { Todo, TodoForm } from './features/todo'
import { useTodos } from './features/todo/hook'

function App() {
  const { todos, getTodos, createTodo, updateTodo } = useTodos()

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const initialize = async () => {
      await getTodos();
      setInitialized(true);
    }

    if (!initialized) {
      initialize();
    }
  }, [getTodos, initialized])
  return (
    <>
      <TodoForm createTodo={createTodo} />
      <div className='todo-items'>
        <h1>Todos</h1>
        <hr/>

        {todos.map((todo, idx) => (
          <Todo 
            key={`${idx}-${todo.name}`} 
            todo={todo} 
            updateTodo={updateTodo} />
        ))}
      </div>
    </>
  )
}

export default App
