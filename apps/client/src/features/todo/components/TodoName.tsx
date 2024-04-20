import { useRef, useState } from "react";
import useTodoForm from "../hooks/todo-form"
import { Duty } from "@repo/common";
import FormField from "@components/FormField";


interface TodoNameFormProps {
    todo: Duty;
    updateTodo: (todo: Duty) => Promise<void>;
}
const TodoName = (props: TodoNameFormProps) => {
    const { todo, updateTodo } = props;

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors }
     } = useTodoForm({
        name: todo.name
    });

    const [name, setName] = useState<string>(todo.name);
    const [edit, setEdit] = useState<boolean>(false);
    const nameInput = useRef<HTMLInputElement>(null);
    const setEditMode = (mode: boolean) => {
        setEdit(mode);
        if (mode) {
            setTimeout(() => {
                nameInput.current?.focus();
            }, 0);
        }
    }

    const saveName = async (
        data: Duty,
    ) => {
        try {
            const updatedTodo = { ...todo, name: data.name };
            await updateTodo(updatedTodo);
            setEditMode(false);
        } catch (error) {
            setEditMode(false);
            setName(todo.name);
        }
    }


    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setName(value);
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape') {
            setEditMode(false);
            setName(todo.name);
        } else if (e.key === 'Enter') {
            setEditMode(false);
            await handleSubmit(saveName)();
        }
    }

    return (
        edit ? (
            <form
                onSubmit={handleSubmit(saveName)}
                onKeyDown={(e) => handleKeyDown(e)}
            >
                <button 
                    type="submit">Save</button>
                <FormField
                    type="text"
                    placeholder="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                    alertMode={true}
                />
            </form>
        ) : (
            <p onClick={() => setEditMode(!edit)}>{name}</p>
        )
    )
}

export default TodoName;