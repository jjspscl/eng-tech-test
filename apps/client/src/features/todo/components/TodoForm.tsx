import { useState } from "react";


const TodoForm = () => {
    const [text, setText] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;
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