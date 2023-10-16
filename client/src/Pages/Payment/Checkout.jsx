import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import { getUserData } from "../../Redux/Slices/AuthSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rzorpayKey = useSelector((state) => state?.razorpay?.key);
  const [subscription_id, setSubscription_id] = useState(
    useSelector((state) => state?.razorpay?.subscription_id)
  );
  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentVerified
  );
  const userData = useSelector((state) => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!rzorpayKey || !subscription_id) {
      toast.error("something went wrong");
      return;
    }

    const options = {
      key: rzorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt Ltd",
      description: "subscription",
      theme: {
        color: "#fff",
      },
      prefill: {
        email: userData?.email,
        name: userData?.fullName,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        if (res?.payload?.success) {
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    // Fetch the RazorPay ID
    (async () => {
      await dispatch(getRazorPayId());
    })();

    // Check the user's subscription status
    switch (userData?.subscription?.status) {
      case "active":
        // Navigate outside of the switch statement
        navigate("/courses");
        break;

      // if already created subscription, then use previous id for this
      case "created":
        setSubscription_id(userData?.subscription?.id);
        break;

      default:
        // If the user doesn't have a subscription, purchase a bundle
        (async () => {
          await dispatch(purchaseCourseBundle());
        })();
        break;
    }
  }, [dispatch, navigate, userData]);
  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={handleSubscription}
          className="flex flex-col dark:bg-gray-800 bg-white gap-4 rounded-lg md:py-10 py-7 md:px-8 md:pt-3 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl transition duration-300"
        >
          <div>
            <h1 className="bg-yellow-500 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-white">
              Subscription Bundle
            </h1>
            <div className="px-4 space-y-7 text-center text-gray-600 dark:text-gray-300">
              <p className="text-lg mt-5">
                Unlock access to all available courses on our platform for{" "}
                <span className="text-yellow-500 font-bold">1 year</span>. This
                includes both existing and new courses.
              </p>

              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                <BiRupee />
                <span>499</span>
              </p>

              <div className="text-xs">
                <p className="text-blue-600 dark:text-yellow-500">
                  100% refund on cancellation
                </p>
                <p>* Terms and conditions apply *</p>
              </div>

              <button
                type="submit"
                className="bg-yellow-500  transition duration-300 w-full text-xl font-bold text-white py-2 rounded-bl-lg rounded-br-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}
