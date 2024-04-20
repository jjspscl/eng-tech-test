import { FieldError, UseFormRegister } from "react-hook-form";
import { Duty, DutyFields } from "@repo/common";
import { useEffect } from "react";

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: DutyFields;
    register: UseFormRegister<Duty>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    alertMode?: boolean;
};
  

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber = false,
  alertMode = false,
}) => {
  useEffect(() => {
    if (error && alertMode) {
      const err = `${name} ${error.message}`
      alert(err)
    }
  }, [error]);

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && !alertMode && <span className="error-message">{error.message}</span>}
    </div>
  );
}
export default FormField;