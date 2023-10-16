import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { changePassword } from "../../Redux/Slices/AuthSlice";
import InputBox from "../../Components/InputBox/InputBox";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  }

  async function onChangePassword(event) {
    event.preventDefault();
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("Please fill all the details");
      return;
    }

    setIsLoading(true);
    
    // dispatch create account action
    const response = await dispatch(changePassword(userPassword));
    if (response?.payload?.success) {
      setUserPassword({
        oldPassword: "",
        newPassword: "",
      });
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
            Change Password Page
          </h1>
          
          {/* old password */}
          <InputBox
            label={"Old Password"}
            name={"oldPassword"}
            type={"password"}
            placeholder={"Enter your old password..."}
            onChange={handleUserInput}
            value={userPassword.oldPassword}
          />
          {/* new password */}
          <InputBox
            label={"New Password"}
            name={"newPassword"}
            type={"password"}
            placeholder={"Enter your new password..."}
            onChange={handleUserInput}
            value={userPassword.newPassword}
          />

          {/* submit btn */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white dark:text-base-200  transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "changing..." : "Change"}
          </button>

          {/* link */}
          <p className="text-center font-inter text-gray-500 dark:text-slate-300">
            Not Remember ?{" "}
            <Link
              to="/reset"
              className="link text-blue-600 font-lato cursor-pointer"
            >
              {" "}
              reset password
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
