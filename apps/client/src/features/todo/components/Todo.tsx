import { Duty } from "@repo/common";
import { useRef, useState } from "react";

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
    const setEditMode = (mode: boolean) => {
        setEdit(mode);
        if (mode) {
            setTimeout(() => {
                nameInput.current?.focus();
            }, 0);
        }
    }

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

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setName(value);
    }

    const onNameSave = async (
        name: string,
        e?: React.FormEvent<HTMLFormElement>,
    ) => {
        e && e.preventDefault();

        try {
            const updatedTodo = { ...todo, name };
            await updateTodo(updatedTodo);
            setEditMode(false);
        } catch (error) {
            setEditMode(false);
            setName(todo.name);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setEditMode(false);
            setName(todo.name);
        } else if (e.key === 'Enter') {
            setEditMode(false);
            onNameSave(name);
        }
    }

    return (
        <div className="todo-item" onKeyDown={handleKeyDown}>
            {
                edit ? (
                    <form
                        onSubmit={(e) => onNameSave(name, e)}
                    >
                        <button 
                            type="submit">Save</button>
                        <input 
                            type="text" 
                            ref={nameInput}
                            defaultValue={todo.name}
                            onChange={(e) => onNameChange(e)}
                        />
                    </form>
                ) : (
                    <p onClick={() => setEditMode(!edit)}>{name}</p>
                )
            }
            <input type="checkbox" checked={checked}
                onChange={onCheck}
            />
        </div>
    )
}

export default Todo;