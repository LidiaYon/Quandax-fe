interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ErrorDisplayProps {
  errors: ValidationError[] | string;
}

const ApiErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  if (!errors) return null;

  const isValidationErrors = Array.isArray(errors);

  return (
    <div className="rounded-md bg-red-50 p-4 mb-6">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {isValidationErrors ? 'Please correct the following errors:' : 'Error'}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            {isValidationErrors ? (
              <ul className="list-disc space-y-1 pl-5">
                {errors.map((error, index) => (
                  <li key={index}>
                    {error.path.charAt(0).toUpperCase() + error.path.slice(1)}: {error.msg}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{errors}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiErrorDisplay;