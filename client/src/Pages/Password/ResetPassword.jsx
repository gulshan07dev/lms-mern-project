import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";
import InputBox from "../../Components/InputBox/InputBox";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");

  async function onChangePassword(event) {
    event.preventDefault();
    if (!password) {
      toast.error("password is required");
      return;
    }

    setIsLoading(true);

    // dispatch create account action
    const response = await dispatch(resetPassword({ resetToken, password }));
    if (response?.payload?.success) {
      setPassword("");
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={onChangePassword}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl  "
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
            Reset Password Page
          </h1>

          {/* password */}
          <InputBox
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter your new password..."}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {/* submit btn */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white dark:text-base-200  transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset"}
          </button>

          {/* link */}
          {isLoggedIn && (
            <p className="text-center font-inter text-gray-500 dark:text-slate-300">
              Back to profile ?{" "}
              <Link
                to="/user/profile"
                className="link text-blue-600 font-lato cursor-pointer"
              >
                {" "}
                profile
              </Link>
            </p>
          )}
        </form>
      </section>
    </Layout>
  );
}
