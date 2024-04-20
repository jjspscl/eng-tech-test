import { useState } from 'react'
import { TodoForm, TodoList } from './features/todo'
import { Duty } from '@repo/common';
function App() {

  const [todos, setTodos] = useState<Duty[]>([])
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  )
}

export default App
