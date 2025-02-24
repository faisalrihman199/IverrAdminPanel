import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAPP } from "../../contexts/Appcontext";
import { FaSyncAlt } from "react-icons/fa";

const CouponForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("");
  const { theme } = useAPP();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append(key, data[key][0]);
        continue;
      }
      formData.append(key, data[key]);
    }
    console.log("Form Data:", Object.fromEntries(formData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const generateCouponCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setValue("code", code);
  };

  const formBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === "dark" ? "bg-gray-800 text-white" : "bg-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full p-6 sm:p-10 rounded-2xl shadow-sm`}
    >
      {/* Row 1 => Code, Value, Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Coupon Code */}
        <div className="flex items-end gap-2">
          <div className="w-full">
            <label className={`block text-sm font-medium ${labelColor} mb-2`}>
              Coupon Code
            </label>
            <input
              type="text"
              {...register("code", { required: "Coupon code is required" })}
              className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>
          <button
            type="button"
            onClick={generateCouponCode}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            <FaSyncAlt />
          </button>
        </div>

        {/* Coupon Value */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Coupon Value
          </label>
          <input
            type="number"
            step="0.01"
            {...register("value", { required: "Value is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-500">{errors.value.message}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Expiry Date
          </label>
          <input
            type="date"
            {...register("expiry", { required: "Expiry date is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.expiry && (
            <p className="mt-1 text-sm text-red-500">{errors.expiry.message}</p>
          )}
        </div>
      </div>

      {/* Row 2 => Title, Subtitle, Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Title */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Subtitle */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Subtitle
          </label>
          <input
            type="text"
            {...register("subtitle")}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
        </div>

        {/* Status */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Status
          </label>
          <select
            {...register("status", { required: "Status is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Row 3 => MinValue, Image (rest of the space) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Min Order Amount */}
        <div>
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Min Order Amount
          </label>
          <input
            type="number"
            step="0.01"
            {...register("minValue", {
              required: "Minimum order amount is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.minValue && (
            <p className="mt-1 text-sm text-red-500">{errors.minValue.message}</p>
          )}
        </div>

        {/* Coupon Image (Takes full space on larger screens) */}
        <div className="sm:col-span-1 lg:col-span-2">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Coupon Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            {...register("image", { required: "Image is required" })}
            className={`w-full border border-gray-300 rounded-lg text-sm ${inputBG} file:bg-gray-200 file:border-0 file:py-3 file:px-4`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>
      </div>

      {/* Row 4 => Description (Full Width) */}
      <div className="mt-6">
        <label className={`block text-sm font-medium ${labelColor} mb-2`}>
          Description
        </label>
        <textarea
          {...register("description")}
          className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          rows="3"
        />
      </div>

      <div className="mt-16">
        <hr />
      </div>

      {/* Submit Button */}
      <div className=" mt-8">
        <button
          type="submit"
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full 
                     hover:bg-purple-700 transition-colors"
        >
          Save Coupon
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
