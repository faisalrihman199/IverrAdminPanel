import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAPP } from "../../contexts/Appcontext";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { theme, updateInfo, getData } = useAPP();
  const [loading, setLoading] = useState(false);

  // Fetch current profile info and pre-fill the form
  useEffect(() => {
    getData("auth/info")
      .then((res) => {
        if (res.success) {
          console.log("Response:", res);
          reset(res.data);

        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [getData, reset]);

  const onSubmit = (data) => {
    delete data.email;
    setLoading(true);
    updateInfo(data)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.response?.data?.message || "Error saving profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formBg = theme === "dark" ? "dark-bg" : "bg-white";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === "dark" ? "main-dark" : "bg-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full py-10 rounded-2xl shadow-sm`}
    >
      <div className="px-10">
        {/* Full Name */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>
        {/* Mobile */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Mobile
          </label>
          <input
            type="text"
            {...register("phone", { required: "Mobile number is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter mobile number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
        {/* Old Password */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Old Password
          </label>
          <input
            type="password"
            {...register("oldPassword", {
              // Conditionally require oldPassword if new password is provided
              validate: (value) =>
                watch("password") && !value
                  ? "Old password is required when changing your password"
                  : true,
            })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter old password (if changing password)"
          />
          {errors.oldPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        {/* New Password */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            New Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter new password (optional)"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-16">
        <hr />
      </div>

      <div className="px-10 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <BeatLoader color="white" /> : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
