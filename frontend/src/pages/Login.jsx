import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Error from "../components/forms/Error";
import SubmitButton from "../components/forms/SubmitButton";
import FormInput from "../components/forms/FormInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/loginValidation"; // ✅ Import du schéma de validation

const Login = () => {
  // ✅ Utilisation de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { loginUser, error, isLoading } = useLogin();

  const onSubmit = async (data) => {
    await loginUser(data.email, data.password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <div className="card">
        <div className="card-body">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "400px" }}>
            <h3 className="text-center mb-3">Log In</h3>

            {/* ✅ Ajout de la validation via `react-hook-form` */}
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

            <SubmitButton
              isProcessing={isLoading}
              text="Log In"
              operation={"login"}
            />

            <p className="d-flex gap-1 mt-3">
              You don't have an account?
              <Link to={"/signup"} className="nav-link text-primary fst-italic">
                Sign Up
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
      </div>
    </div>
  );
};

export default Login;
