import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";

export default function CheckoutSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-14 px-3 min-h-[100vh]">
        <div className="flex flex-col dark:bg-gray-800 bg-white gap-12 rounded-lg md:py-10 py-7 md:px-8 md:pt-3 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl transition duration-300">
          <h1 className="bg-green-500 text-center w-full py-4 text-3xl font-inter font-bold rounded-tl-lg rounded-tr-lg text-white">
            Payment Successful
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4 text-center text-gray-600 dark:text-gray-300">
            <AiFillCheckCircle className="text-green-500 text-8xl" />
            <h2 className="text-xl font-semibold font-lato">Welcome to the Pro Bundle</h2>
            <p className="font-nunito-sans">Now you can enjoy all the courses.</p>
          </div>

          <Link
            to="/"
            className="bg-green-500   transition-all ease-in-out duration-300 w-full py-3 text-xl font-semibold text-white text-center rounded-bl-lg rounded-br-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </Layout>
  );
}
