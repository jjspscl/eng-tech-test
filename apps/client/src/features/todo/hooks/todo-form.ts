import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Duty, dutySchema } from "@repo/common";

const useTodoForm = (
    defaultValues?: Partial<Duty>
) => {
    const { register, handleSubmit, reset, formState } = useForm<Duty>({
        resolver: zodResolver(dutySchema),
        defaultValues,
    });

    return { register, handleSubmit, reset, formState };
}

export default useTodoForm;