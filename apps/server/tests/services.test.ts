import { it, describe, expect, vi } from 'vitest';

import { createTodo, getTodos, updateTodo } from '../src/services';
import { MockTodoRepository } from './mock/repository';


describe('services', () => {
    
    it('should test the services', async () => {
        expect(true).toBe(true);
    })
});