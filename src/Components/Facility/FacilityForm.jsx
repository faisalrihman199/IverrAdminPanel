import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPP } from '../../contexts/Appcontext';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const FacilityForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { theme, saveData } = useAPP();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  // Extract the id from the navigation state (if provided)
  const { state } = useLocation();
  const { id } = state || {};

  const onSubmit = (data) => {    
    const formData = new FormData();
    for (const key in data) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    
    setLoading(true);
    // Call saveData with formData, endpoint "facility", and the optional id
    saveData(formData, 'facility', id)
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
        toast.error(err.response?.data?.message || "Error saving Facility");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
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
        {/* Facility Name */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Facility Name
          </label>
          <input
            type="text"
            {...register('name', { required: "Facility Name is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter Facility Name"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Facility Image */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Facility Image
          </label>
          <label htmlFor="file-input-medium" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="file-input-medium"
            accept="image/*"
            id="file-input-medium"
            onChange={handleFileChange}
            {...register('image', { required: "Image is required" })}
            className={`block w-full border border-gray-200 shadow-sm rounded-lg text-sm text-[#212529] ${inputBG} 
                       disabled:opacity-50 disabled:pointer-events-none cursor-pointer
                       file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Facility Status */}
        <div className="mb-6">
          <label className={`${labelColor} block text-sm font-medium mb-2`}>
            Facility Status
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
          {loading ? <BeatLoader color="white" /> : "Save Facility"}
        </button>
      </div>
    </form>
  );
};

export default FacilityForm;
