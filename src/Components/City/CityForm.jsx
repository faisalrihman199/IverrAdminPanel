import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPP } from '../../contexts/Appcontext';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const CityForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { theme, saveData } = useAPP();
  const [loading, setLoading] = useState(false);

  // Extract the id from navigation state (ensure you pass it as state when navigating)
  const location = useLocation();
  const { id } = location.state || {}; 

  // const id = 1;

  const onSubmit = (data) => {    
    setLoading(true);
    saveData(data, 'city',id)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Error :", err);
        toast.error(err.response?.data?.message || "Error saving City");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formBg = theme === 'dark' ? "dark-bg" : "bg-white";
  const labelColor = theme === 'dark' ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === 'dark' ? "main-dark" : "bg-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full py-10 rounded-2xl shadow-sm`}
    >
      <div className="px-10">
        {/* City Name */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            City Name
          </label>
          <input
            type="text"
            {...register('name', { required: "City name is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter city name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* City Status */}
        <div className="mb-6">
          <label className={`${labelColor} block text-sm font-medium mb-2`}>
            City Status
          </label>
          <select
            {...register('status', { required: "Please select a status" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] cursor-pointer ${inputBG}`}
          >
            <option value="">Select Status</option>
            <option value="publish">publish</option>
            <option value="unpublish">unpublish</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-16">
        <hr />
      </div>

      {/* Submit Button */}
      <div className="px-10 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full 
                     hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <BeatLoader color="white" /> : "Save City"}
        </button>
      </div>
    </form>
  );
};

export default CityForm;
