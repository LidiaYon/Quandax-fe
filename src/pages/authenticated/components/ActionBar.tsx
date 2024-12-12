
interface IProps {
  children: React.ReactNode
}


export const ActionBar: React.FC<IProps> = ({ children }) => {
  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          {children}
        </div>
      </div>
    </header>
  );
};
