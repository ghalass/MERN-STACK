import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useLogin } from "../hooks/useLogin";
import Error from "../../components/forms/Error";
import SubmitButton from "../../components/forms/SubmitButton";
import FormInput from "../../components/forms/FormInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginValidation"; // ✅ Import du schéma de validation
import { apiRequest } from "../../utils/apiRequest";
import { useAuth } from "../../context/Auth";

import Cookies from "universal-cookie";

const Login = () => {
  // ✅ Utilisation de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "mike@email.com",
      password: "123456",
    },
  });

  // const { loginUser, error, isLoading } = useLogin();

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const onSubmit = async (data) => {
    // await loginUser(data.email, data.password);
    const response = await apiRequest(`/user/login`, "POST", {
      email: data.email,
      password: data.password,
    });
    const token = response.token;
    // save token in cookie
    const cookie = new Cookies();
    cookie.set("Bearer", token);
    // save token & user in context
    const userInfo = { name: response.name, email: response.email };
    auth.login(userInfo);
    auth.setToken(token);
    // redirect to wanted page & avoid user to back to the prevus page in browser
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <div className="card">
        <div className="card-body">
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
              // disabled={isLoading}
            />

            <FormInput
              type="password"
              id="password"
              label="Password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              // disabled={isLoading}
            />

            <SubmitButton
              // isProcessing={isLoading}
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

            {/* <Error error={error} /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
