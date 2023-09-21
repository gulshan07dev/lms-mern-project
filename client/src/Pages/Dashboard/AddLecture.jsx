import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputBox from "../../Components/InputBox/InputBox";
import TextArea from "../../Components/InputBox/TextArea";
import Layout from "../../Layout/Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("lecture", userInput.lecture);
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);

    const data = { formData, id: userInput.id };

    const response = await dispatch(addCourseLecture(data));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-7 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl  "
        >
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-center dark:text-purple-500 md:text-4xl text-2xl font-bold font-inter">
              Add new lecture
            </h1>
          </header>
          <div className="w-full flex md:flex-row md:justify-between justify-center flex-col md:gap-0 gap-5">
            <div className="md:w-[48%] w-full flex flex-col gap-5">
              {/* lecture video */}
              <div className="border border-gray-300 h-[200px] flex justify-center cursor-pointer">
                {userInput.videoSrc && (
                  <video
                    muted
                    src={userInput.videoSrc}
                    controls
                    controlsList="nodownload nofullscreen"
                    disablePictureInPicture
                    className="object-fill w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      videoRef.current.click();
                    }}
                  ></video>
                )}
                {!userInput.videoSrc && (
                  <label
                    className="font-[500] text-xl h-full w-full flex justify-center items-center cursor-pointer font-lato"
                    htmlFor="lecture"
                  >
                    Choose Your Video
                  </label>
                )}
                <input
                  type="file"
                  className="hidden"
                  id="lecture"
                  ref={videoRef}
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4, video/x-mp4, video/*"
                />
              </div>
            </div>
            <div className="md:w-[48%] w-full flex flex-col gap-5">
              {/* title */}
              <InputBox
                label={"Title"}
                name={"title"}
                type={"text"}
                placeholder={"Enter Lecture Title"}
                onChange={handleInputChange}
                value={userInput.title}
              />
              {/* description */}
              <TextArea
                label={"Description"}
                name={"description"}
                rows={5}
                type={"text"}
                placeholder={"Enter Lecture Description"}
                onChange={handleInputChange}
                value={userInput.description}
              />
            </div>
          </div>

          {/* submit btn */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 bg-yellow-500 text-white dark:text-base-200  transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
          >
            {isLoading ? "Adding Lecture..." : "Add New Lecture"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
