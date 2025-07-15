import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="w-[100%] rounded-md p-4 bg-fuchsia-300 pl-12 border border-gray-200 focus:bg-transparent placeholder:text-black"
      />
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
      )}
      {type == "password" ? (
        passwordVisible ? (
          <Eye
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
            className="absolute left-auto top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          />
        ) : (
          <EyeOff
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
            className="absolute left-auto top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
