import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import InputBox from "../../Components/InputBox/InputBox";
import { FaUserCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import Layout from "../../Layout/Layout";

export default function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 relative gap-7 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl  "
        >
          <div className="flex justify-center items-center">
            <h1 className="text-center absolute left-6 text-violet-500 dark:text-purple-500 text-4xl font-bold font-inter after:content-[' ']  after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
              Profile
            </h1>
            {/* avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden self-center">
              {userData?.avatar?.secure_uel ? (
                <img src={userData?.avatar?.secure_uel} alt="avatar" />
              ) : (
                <FaUserCircle className="h-full w-full" />
              )}
            </div>
            {/* more options */}
            <button type="button" className="absolute right-3 top-3 text-gray-500 dark:text-slate-50 font-inter font-[600]"><FiMoreVertical size={20} /></button>
          </div>
          <div className="w-full flex  flex-wrap gap-6">
            {/* name */}
            <InputBox
              label={"Name"}
              name={"name"}
              type={"text"}
              placeholder={"Enter fullName"}
              value={userData?.fullName || ""}
              className="md:w-[48%] w-[100%]"
            />

            {/* email */}
            <InputBox
              label={"Email"}
              name={"email"}
              type={"email"}
              value={userData?.email || ""}
              className="md:w-[48%] w-[100%]"
              disabled={true}
            />
            {/* role */}
            <InputBox
              label={"Role"}
              name={"role"}
              type={"text"}
              value={userData?.role}
              className="md:w-[48%] w-[100%]"
              disabled={true}
            />
            {/* subscription */}
            <InputBox
              label={"Subscription"}
              name={"subscription"}
              type={"text"}
              value={userData?.subscription?.status || "Not-Active"}
              className="md:w-[48%] w-[100%]"
              disabled={true}
            />
          </div>
        </form>
      </section>
    </Layout>
  );
}
