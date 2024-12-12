import { ChangeEvent } from 'react';
import HelperText from './HelperText';


interface TextAreaProps {
  label?: string;
  error?: string;
  helperText?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const TextArea = ({
  label,
  error,
  helperText,
  value,
  onChange,
  ...props
}: TextAreaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        cols={4}
        rows={5}
        value={value}
        onChange={(e)=>handleChange(e)}
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
      >{value}</textarea>
      
      {error && <HelperText text={error} type="error" />}
      {!error && helperText && <HelperText text={helperText} type="helper" />}
    </div>
  );
};

export default TextArea;