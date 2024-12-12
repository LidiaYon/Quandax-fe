interface HelperTextProps {
    text?: string;
    type?: 'error' | 'helper';
  }
  
  const HelperText = ({ text, type = 'helper' }: HelperTextProps) => {
    if (!text) return null;
  
    return (
      <p 
        className={`
          mt-1 text-sm
          ${type === 'error' ? 'text-red-500' : 'text-green-600'}
        `}
      >
        {text}
      </p>
    );
  };
  
  export default HelperText;