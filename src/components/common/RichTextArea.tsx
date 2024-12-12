import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IProps {
  label?: string;
  value: string;
  id?: string;
  onChange: (value: string) => void;
}

export const RichTextArea: React.FC<IProps> = ({ onChange, value, label, ...props }) => {
  return (
    <div className="w-full mb-20">
  {label && (
    <label
      htmlFor={props.id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
  )}
  <div className="h-[200px] overflow-hidden">
    <ReactQuill
      value={value}
      onChange={(v) => onChange(v)}
      className="h-[200px]"
    />
  </div>
</div>
  );
};

export default RichTextArea;