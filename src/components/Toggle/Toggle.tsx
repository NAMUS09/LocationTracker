import { Dispatch, SetStateAction } from "react";

interface ToggleProps {
  currentState: boolean;
  setState: Dispatch<SetStateAction<any>>;
}

const Toggle: React.FC<ToggleProps> = ({ currentState, setState }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setState(newValue);
  };
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={currentState}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
};

export default Toggle;
