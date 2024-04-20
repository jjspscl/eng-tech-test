import { forwardRef, useEffect, useRef, useState } from "react";
import useTodoForm from "../hooks/todo-form"
import { Duty, dutySchema } from "@repo/common";
import FormField from "../../../components/FormField";
import { RefCallBack } from "react-hook-form";
import { Tooltip } from "antd";


interface TodoNameFormProps {
    todo: Duty;
    updateTodo: (todo: Partial<Duty>) => Promise<void>;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
}
const TodoName = (props: TodoNameFormProps) => {
    const { todo, updateTodo, editMode, setEditMode } = props;

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors }
     } = useTodoForm({
        name: todo.name
    });

    const [name, setName] = useState<string>(todo.name);

    const saveName = async (
        data: Partial<Duty>,
    ) => {
        try {
            const updatedTodo = { ...todo, name: data.name };
            await updateTodo(updatedTodo);
            setEditMode(false);
        } catch (error) {
            setEditMode(false);
            setName(todo.name);
        }

        reset();
    }

    const onNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const previousName = todo.name;
        const { value } = e.target;

        const data = await dutySchema.safeParseAsync({ name: value });
        if (data.success) {
            setName(value);
            await saveName({ name: value });
        } else {
            data.error.issues.forEach((issue) => {
                alert(issue.message);
            })
            setName(previousName);
        }

    }   

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape') {
            setEditMode(false);
            setName(todo.name);
        } else if (e.key === 'Enter') {
            setEditMode(false);
            await onNameChange(e as any);
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (editMode && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            })
        }
    }, [editMode]);

    return (
        editMode ? (
            <form
                onSubmit={handleSubmit(saveName)}
                onKeyDown={(e) => handleKeyDown(e)}
            >
                <FormField
                    type="text"
                    placeholder="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                    alertMode={true}
                    ref={inputRef}
                />
            </form>
        ) : (
            <p className="todo-name">{name}</p>
        )
    )
}

export default TodoName;