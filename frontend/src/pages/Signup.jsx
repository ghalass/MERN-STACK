import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import Error from "../components/Error";
import SubmitBtn from "../components/forms/SubmitBtn";
import FormInput from "../components/forms/FormInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/signupValidation"; // ✅ Import du schéma de validation

const Signup = () => {
  // ✅ Utilisation de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { signup, error, isLoading } = useSignup();

  const onSubmit = async (data) => {
    await signup(data.name, data.email, data.password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Sign Up</h3>

        {/* ✅ Ajout de la validation via `react-hook-form` */}
        <FormInput
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <FormInput
          type="email"
          id="email"
          label="E-mail"
          placeholder="Enter your email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <FormInput
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <FormInput
          type="password"
          id="passwordConfirm"
          label="Confirm Password"
          placeholder="Confirm your password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <SubmitBtn isLoading={isLoading} text="Sign Up" />

        <p className="d-flex gap-1 mt-3">
          You have an account?
          <Link to={"/login"} className="nav-link text-primary fst-italic">
            Login
          </Link>
        </p>

        <p className="d-flex gap-1">
          Go
          <Link to={"/"} className="nav-link text-primary fst-italic">
            Home
          </Link>
        </p>

        <Error error={error} />
      </form>
    </div>
  );
};

export default Signup;
