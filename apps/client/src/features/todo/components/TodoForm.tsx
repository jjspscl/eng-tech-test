import { Duty } from "@repo/common";
import { useState } from "react";

interface TodoFormProps {
    createTodo: (todo: Omit<Duty,'id'>) => Promise<void>;
}
const TodoForm = ({
    createTodo
}: TodoFormProps) => {
    const [text, setText] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;
        createTodo({ name: text, completed: false });
        setText('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    );
}


export default TodoForm;