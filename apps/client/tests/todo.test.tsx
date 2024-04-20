import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Todo, TodoForm, TodoName } from '../src/features/todo/components';
import { Duty } from '@repo/common';

const todo: Duty = {
  id: "1",
  name: 'Test Todo',
  completed: false
}

const todos: Duty[] = [
  {
    id: "1",
    name: 'Test Todo',
    completed: false
  },
  {
    id: "2",
    name: 'Test Todo 2',
    completed: false
  }
]

describe('Todo', () => {
  
  it('should render the Todo component', () => {
    render(<Todo todo={todo} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  })

  it('should render the Todo component with edit mode', () => {
    render(<Todo todo={todo} editMode />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  })

  it('should render the TodoForm component', () => {
    render(<TodoForm createTodo={async () => {}} />);
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  })

  it('should render the TodoName component', async () => {
    render(<TodoName todo={todo} updateTodo={async (todo) => {}}/>);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  })
})