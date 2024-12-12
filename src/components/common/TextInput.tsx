import { ChangeEvent } from 'react';
import HelperText from './HelperText';

type InputType = 'text' | 'password' | 'number' | 'email' | 'date';

interface TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  type: InputType;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const TextInput = ({
  label,
  error,
  helperText,
  type,
  value,
  onChange,
  ...props
}: TextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id} 
          className="w-full px-3 py-2 border rounded"
        >
          {label}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={handleChange}
        {...props}
        className={`
          w-full px-3 py-2 
          border rounded-md shadow-sm 
          text-sm
          placeholder-gray-400
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }
          focus:outline-none focus:ring-1
          disabled:bg-gray-50 disabled:text-gray-500
        `}
      />
      
      {error && <HelperText text={error} type="error" />}
      {!error && helperText && <HelperText text={helperText} type="helper" />}
    </div>
  );
};

export default TextInput;