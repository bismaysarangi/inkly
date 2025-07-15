import InputBox from "../components/InputBox";
import { User, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

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

        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon={<Key />}
        />

        <Button
          className="whitespace-nowrap bg-black text-white rounded-full py-4 px-6 text-base capitalize hover:bg-opacity-80 flex items-center justify-center mx-auto"
          type="submit"
        >
          {type.replace("-", " ")}
        </Button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-20 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <Button className="whitespace-nowrap bg-black text-white rounded-full py-4 px-6 text-base capitalize hover:bg-opacity-80 flex items-center justify-center mx-auto">
          <img src="/google.png" alt="" className="w-5" />
          Continue with Google
        </Button>
      </form>
    </section>
  );
};

export default UserAuthForm;
