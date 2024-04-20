import { Duty } from "@repo/common";
import { useEffect, useRef, useState } from "react";
import TodoName from "./TodoName";
import { Checkbox } from "antd";

interface TodoProps {
    todo: Duty;
    updateTodo: (todo: Partial<Duty>) => Promise<void>;
}

const Todo = (
    { 
        todo, 
        updateTodo,
    }: TodoProps
) => {
    const [checked, setChecked] = useState<boolean>(todo.completed);

    const onCheck = async () => {
        setChecked(!checked);

        try {
            const updatedTodo = { ...todo, completed: !todo.completed };
            await updateTodo(updatedTodo);
        } catch (error) {
            console.error(error);
            setChecked(todo.completed);
        }
    }

    const [editMode, setEditMode] = useState<boolean>(false);
    const todoRef = useRef<HTMLDivElement>(null);
    const onTodoClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setEditMode(true);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (todoRef.current && !todoRef.current.contains(e.target as Node)) {
                setEditMode(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
    }, [todoRef]);
    return (
        <div className="todo-item" onClick={onTodoClick} ref={todoRef}>
            <TodoName todo={todo} updateTodo={updateTodo} editMode={editMode} setEditMode={setEditMode} />
            <Checkbox checked={todo.completed} onClick={onCheck} />
        </div>
    )
}

export default Todo;