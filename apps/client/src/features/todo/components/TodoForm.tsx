import FormField from "../../../components/FormField";
import { Duty } from "@repo/common";
import useTodoForm from "../hooks/todo-form";

interface TodoFormProps {
    createTodo: (todo: Omit<Duty,'id'>) => Promise<void>;
}
const TodoForm = ({
    createTodo
}: TodoFormProps) => {
    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useTodoForm();
    
    const submitTodo = async (data: Duty) => {
        await createTodo({ name: data.name, completed: false });
        reset();
    };
    
    return (
        <form className="add-todo" onSubmit={handleSubmit(submitTodo)}>
            <FormField
                type="text"
                placeholder="Name"
                name="name"
                register={register}
                error={errors.name}
                alertMode={false}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}


export default TodoForm;