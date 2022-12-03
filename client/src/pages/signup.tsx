import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useSignupUserMutation,
  useCheckAuthStatusQuery,
} from "../features/auth/authApi";
import { FaShopify } from "react-icons/fa";

interface SignupFormProps {
  email: string;
  username: string;
  password: string;
}

export default function Signup(): React.ReactElement {
  const { register, handleSubmit } = useForm<SignupFormProps>();
  const navigate = useNavigate();
  const [signupMutation] = useSignupUserMutation();
  const { data, refetch } = useCheckAuthStatusQuery("");
  if (data?.isAuthenticated) {
    navigate("/my-shop");
  }
  const signupUser: SubmitHandler<SignupFormProps> = async (formData) => {
    await signupMutation(formData);
    navigate("/login");
    refetch();
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="border border-indigo-500 rounded bg-gray-50">
        <div className="flex items-center justify-center py-6 space-x-3 overflow-hidden text-indigo-500 rounded">
          <FaShopify className="text-4xl" />
          <p className="text-xl font-semibold">Shop Finder</p>
        </div>
        <form
          onSubmit={handleSubmit(signupUser)}
          className="flex flex-col w-64 p-3 space-y-3"
        >
          <div className="flex flex-col my-3 space-y-3">
            <input
              type="text"
              {...register("email", { required: true })}
              className="p-2 border border-indigo-500 rounded-full"
              placeholder="Email"
            />
            <input
              type="text"
              {...register("username", { required: true })}
              className="p-2 border border-indigo-500 rounded-full"
              placeholder="Username"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              className="p-2 border border-indigo-500 rounded-full "
              placeholder="Password"
            />
          </div>
          <button className="self-center px-6 py-2 text-white bg-indigo-500 border rounded-full w-fit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
