import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from '../src/App';

describe('App', () =>{
    it('should render the App component', () => {
        render(<App />);
        expect(screen.getByText('Todos')).toBeInTheDocument();
    })

    it('should render the add todo form', () => {
        render(<App />);
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
    })
})