import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../../Redux/Slices/AuthSlice";
import InputBox from "../../Components/InputBox/InputBox";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock, IoIosRefresh } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userInput, setUserInput] = useState({
    name: userData?.fullName || "",
    avatar: null,
    previewImage: null,
    userId: null,
  });
  const avatarInputRef = useRef(null);
  const [isChanged, setIschanged] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          avatar: uploadImage,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    setIsUpdating(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", userInput.name);
    if (userInput.avatar) {
      formData.append("avatar", userInput.avatar);
    }
    const data = { formData, id: userInput.userId };
    const response = await dispatch(updateUserData(data));
    if (response?.payload?.success) {
      await dispatch(getUserData());
      setIschanged(false);
    }
    setIsUpdating(false);
  }

  async function handleCancelSubscription() {
    const res = await dispatch(cancelCourseBundle());
    if (res?.payload?.success) {
      await dispatch(getUserData());
    }
  }

  useEffect(() => {
    setIschanged(userInput.name !== userData?.fullName || userInput.avatar);
  }, [userInput]);

  useEffect(() => {
    async function fetchUser() {
      await dispatch(getUserData());
    }
    if (Object.keys(userData).length < 1) fetchUser();
  }, []);

  useEffect(() => {
    setUserInput({
      ...userInput,
      name: userData?.fullName,
      userId: userData?._id,
    });
  }, []);

  return (
    <Layout hideFooter={true}>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          autoComplete="off"
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col dark:bg-base-100 relative gap-7 rounded-lg md:py-10 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl  "
        >
          <div className="flex justify-center items-center">
            <h1 className="text-center absolute left-6 md:top-auto top-5 text-violet-500 dark:text-purple-500 md:text-4xl text-3xl font-bold font-inter after:content-[' ']  after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600">
              Profile
            </h1>
            {/* avatar */}
            <div
              className="w-16 h-16 rounded-full overflow-hidden self-center cursor-pointer"
              onClick={() => avatarInputRef.current.click()}
            >
              {userData?.avatar?.secure_url || userInput.previewImage ? (
                <img
                  src={
                    userInput.previewImage
                      ? userInput.previewImage
                      : userData?.avatar?.secure_url
                  }
                  alt="avatar"
                  className="h-full w-full"
                />
              ) : (
                <FaUserCircle className="h-full w-full" />
              )}
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                className="hidden"
                ref={avatarInputRef}
                onChange={handleImageUpload}
              />
            </div>
            {/* more options */}
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="absolute right-0 text-gray-500 dark:text-slate-50 font-inter font-[600]"
                onClick={() => setIsDialogOpen((prev) => !prev)}
              >
                <FiMoreVertical size={20} />
              </button>

              <dialog
                open={isDialogOpen}
                className="bg-white dark:bg-base-300 transition-all duration-500 border-[1px] border-gray-200 dark:border-gray-500 rounded-s-xl rounded-ee-xl py-5 shadow-lg w-fit relative right-0 top-7"
              >
                <div className="w-full flex flex-col gap-2 items-start">
                  <button
                    className="text-gray-700 w-full flex items-center gap-2 dark:text-white px-3 pb-2 border-b-[1px] border-gray-300"
                    onClick={() => navigate("change-password")}
                  >
                    <IoIosLock /> Change password
                  </button>
                  <button
                    className="text-[#ff1414] dark:text-red-300 px-3 w-full flex items-center gap-2"
                    onClick={() => navigate("reset-password")}
                  >
                    <IoIosRefresh /> Reset password
                  </button>
                </div>
              </dialog>
            </div>
          </div>

          <div className="w-full flex  flex-wrap gap-6">
            {/* name */}
            <InputBox
              label={"Name"}
              name={"name"}
              type={"text"}
              placeholder={"Enter fullName"}
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
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
          {/* submit button */}
          <div className="w-full flex md:flex-row flex-col md:justify-between justify-center md:gap-0 gap-3">
            <button
              type="submit"
              className="py-3.5  rounded-md bg-yellow-500 mt-3 text-white font-inter   md:w-[48%] w-full"
              disabled={!isChanged || isUpdating}
            >
              {isUpdating ? "Saving Changes..." : "Save Changes"}
            </button>

            {/* show cancel subscription btn if Active */}
            {userData?.subscription?.status === "active" && (
              <button
                type="button"
                onClick={handleCancelSubscription}
                className="py-3.5 rounded-md bg-[#f32e2e] mt-3 text-white font-inter md:w-[48%] w-full"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </form>
      </section>
    </Layout>
  );
}
