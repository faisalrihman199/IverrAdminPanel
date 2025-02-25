import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAPP } from '../../contexts/Appcontext';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const GalleryForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [fileNames, setFileNames] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme, getData, saveData } = useAPP();
  const { state } = useLocation();
  const { id } = state || {};

  useEffect(() => {
    getData("carType")
      .then((res) => {
        console.log("Response:", res.carTypes);
        setCarTypes(res.carTypes);
      })
      .catch((err) => {
        console.error("Error fetching car types:", err);
      });
  }, [getData]);

  const onSubmit = (data) => {    
    const formData = new FormData();
    for (const key in data) {
      if (key === 'image') {
        // Append each selected file
        for (let file of data[key]) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    setLoading(true);
    saveData(formData, "gallery", id)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Error saving gallery:", err);
        toast.error(err.response?.data?.message || "Error saving gallery");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFileNames(files.map(file => file.name));
    }
  };

  const formBg = theme === 'dark' ? "dark-bg" : "bg-white";
  const labelColor = theme === 'dark' ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === 'dark' ? "main-dark" : "bg-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full py-10 rounded-2xl shadow-sm transition-colors duration-300`}
    >
      {/* Car Type Dropdown and Image Input */}
      <div className="px-10">
        {/* Car Type Dropdown */}
        <div className="mb-6">
          <label className={`${labelColor} block text-sm font-medium mb-2`}>
            Select Car
          </label>
          <select
            {...register('carTypeId', { required: "Please select a car" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] cursor-pointer ${inputBG}`}
          >
            <option value="">Select Car</option>
            {carTypes.map((carType) => (
              <option key={carType.id} value={carType.id}>
                {carType.title}
              </option>
            ))}
          </select>
          {errors.carTypeId && (
            <p className="mt-1 text-sm text-red-500">{errors.carTypeId.message}</p>
          )}
        </div>
        {/* Image Input */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Gallery Image
          </label>
          <label htmlFor="file-input-medium" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="file-input-medium"
            id="file-input-medium"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            {...register('image', { required: "Image is required" })}
            className={`block w-full border ${inputBG} border-gray-200 shadow-sm rounded-lg text-sm text-[#212529]
                       disabled:opacity-50 disabled:pointer-events-none cursor-pointer
                       file:bg-gray-200 file:border-0 file:py-3 file:px-4`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-16">
        <hr className="border-gray-200" />
      </div>

      {/* Submit Button */}
      <div className="px-10 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <BeatLoader color="white" /> : "Save Gallery"}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;
