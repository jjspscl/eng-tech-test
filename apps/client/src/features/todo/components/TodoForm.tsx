import FormField from "../../../components/FormField";
import { Duty } from "@repo/common";
import useTodoForm from "../hooks/todo-form";
import { Button } from "antd";

interface TodoFormProps {
    createTodo: (todo: Omit<Duty,'id'>) => Promise<void>;
}
const TodoForm = ({
    createTodo
}: TodoFormProps) => {
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useTodoForm();
    
    const submitTodo = async (data: Duty) => {
        await createTodo({ name: data.name, completed: false });
    };
    
    return (
        <form className="add-todo" onSubmit={handleSubmit(submitTodo)}>
            <FormField
                type="text"
                placeholder="Name"
                name="name"
                register={register}
                error={errors.name}
                alertMode={true}
            />
            <Button htmlType="submit">Add Todo</Button>
        </form>
    );
}


export default TodoForm;