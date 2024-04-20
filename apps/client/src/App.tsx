import { useEffect, useState } from 'react'
import { Todo, TodoForm } from './features/todo'
import { useTodos } from './features/todo/hook'
import { Card, ConfigProvider, Typography, theme } from 'antd';

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

  const [mode, setMode] = useState('light');
  const onSelectMode = (mode: string) => {
    setMode(mode)
    if (mode === 'dark')
      document.body.classList.add('dark-mode')
    else
      document.body.classList.remove('dark-mode')
  }
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));

    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {
        });
    }
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Card: {
            boxShadow: "rgba(0, 0, 0, 0.09)"
          }
        }
      }}
    >

      <Card title="Todos" className='todo-container'>
        <TodoForm createTodo={createTodo} />
        <div className='todo-items'>
          {
            todos.length === 0 && (
              <div className='no-todos'>
                <Typography.Title level={4}>No todos yet</Typography.Title>
              </div>
            )
          }
          {todos.map((todo, idx) => (
            <Todo 
              key={`${idx}-${todo.name}`} 
              todo={todo} 
              updateTodo={updateTodo} />
          ))}
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default App
