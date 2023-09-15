import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import NotFoundImg from "../assets/images/not-found.png";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Layout hideBar={true} hideNav={true}>
      <section className="min-h-screen pb-8 w-full flex md:flex-row flex-col-reverse md:justify-around bg-white  dark:bg-[#131212]">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-9xl font-extrabold text-gray-700 dark:text-white tracking-widest">
            404
          </h1>
          <div className="bg-red-500 dark:bg-black text-white px-2 text-sm rounded rotate-12 absolute">
            Page not found ...
          </div>
          <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
              <span
                onClick={() => navigate(-1)}
                className="relative block px-8 py-3 bg-[#1A2238] text-white border border-current"
              >
                Go Back
              </span>
            </a>
          </button>
        </div>
        <img src={NotFoundImg} alt="" />
      </section>
    </Layout>
  );
}

export default NotFound;
