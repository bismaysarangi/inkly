import InputBox from "../components/InputBox";
import { User, Mail } from "lucide-react";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-screen flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          {type == "sign-in" ? "Welcome back" : "Join us today!"}
        </h1>

        {type != "sign-in" ? (
          <InputBox
            name="fullname"
            type="text"
            placeholder="Full Name"
            icon={<User />}
          />
        ) : (
          ""
        )}
        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon={<Mail />}
        />
      </form>
    </section>
  );
};

export default UserAuthForm;
