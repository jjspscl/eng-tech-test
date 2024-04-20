import { FieldError, RefCallBack, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { Duty, DutyFields } from "@repo/common";
import { LegacyRef, forwardRef, useEffect } from "react";
import { Input, InputRef } from "antd";

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: DutyFields;
    register: UseFormRegister<Duty>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    alertMode?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef?: RefCallBack;
};
  
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber = false,
    alertMode = false,
    onChange
  }, ref) => {
    useEffect(() => {
      if (error && alertMode) {
        const err = `${name} ${error.message}`
        alert(err)
      }
    }, [error]);
    const fields: UseFormRegisterReturn<DutyFields> = {
      ...register(name, { valueAsNumber }),
    }
  
    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
  
      fields.onChange(e); 
    }
  
  
    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          {...fields}
          onChange={_onChange}
          // ref={ref as LegacyRef<InputRef> | undefined}
        />
        {error && !alertMode && <span className="error-message">{error.message}</span>}
      </>
    );
  }
)
export default FormField;