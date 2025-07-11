import { User } from "lucide-react";

const InputBox = ({ name, type, id, value, placeholder }) => {
  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="w-[100%] rounded-md p-4 bg-fuchsia-300 pl-12 border border-gray-200 focus:bg-transparent placeholder:text-black"
      ></input>
      <User className="absolute left-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default InputBox;
