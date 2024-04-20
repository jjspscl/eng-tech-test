import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Duty, dutySchema } from "@repo/common";

const useTodoForm = (
    defaultValues?: Partial<Duty>
) => {
    const form = useForm<Duty>({
        resolver: zodResolver(dutySchema),
        defaultValues,
    });

    return form;
}

export default useTodoForm;