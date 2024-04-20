import { Duty } from "@repo/common";
import { useRef, useState } from "react";
import TodoName from "./TodoName";

interface TodoProps {
    todo: Duty;
    updateTodo: (todo: Duty) => Promise<void>;
    editMode?: boolean;
}

const Todo = (
    { 
        todo, 
        updateTodo,
        editMode = false
    }: TodoProps
) => {
    const [name, setName] = useState<string>(todo.name);
    const [checked, setChecked] = useState<boolean>(todo.completed);
    const [edit, setEdit] = useState<boolean>(editMode);

    const nameInput = useRef<HTMLInputElement>(null);


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


    return (
        <div className="todo-item">
            <TodoName todo={todo} updateTodo={updateTodo} />
            <input type="checkbox" checked={checked}
                onChange={onCheck}
            />
        </div>
    )
}

export default Todo;