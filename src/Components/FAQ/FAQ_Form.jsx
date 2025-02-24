import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPP } from '../../contexts/Appcontext';

const  FAQ_Form = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const {theme}=useAPP();

  const onSubmit = (data) => {    
    console.log("Form Data is :", data);
  };

  
  const formBg = theme === 'dark' ? "dark-bg" : "bg-white";
  const labelColor = theme === 'dark' ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === 'dark' ? "main-dark" : "bg-white";


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full py-10 rounded-2xl shadow-sm`}
    >
      {/* Banner Image & Status Section */}
      <div className="px-10">
        {/* Banner Image */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Enter Question
          </label>
          <input
            type="text"
            {...register('question', { required: "Question is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter Question"
          />
          {errors.question && (
            <p className="mt-1 text-sm text-red-500">{errors.question.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className={`block text-sm font-medium ${labelColor} mb-2`}>
            Enter Answer
          </label>
          <input
            type="text"
            {...register('answer', { required: "Answer is required" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] ${inputBG} focus:outline-none focus:ring-1 focus:ring-purple-500`}
            placeholder="Enter Answer"
          />
          {errors.answer && (
            <p className="mt-1 text-sm text-red-500">{errors.answer.message}</p>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="mb-6">
          <label className={`${labelColor} block text-sm font-medium  mb-2`}>
            Select Status
          </label>
          <select
            {...register('status', { required: "Please select a status" })}
            className={`w-full p-3 border border-gray-200 rounded-md text-sm text-[#212529] cursor-pointer  ${inputBG}`}
          >
            <option value="">Choose...</option>
            <option value="publish">publish</option>
            <option value="unpublish">unpublish</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Divider with extra spacing */}
      <div className="mt-16">
        <hr />
      </div>

      {/* Submit Button */}
      <div className="px-10 mt-8">
        <button
          type="submit"
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full 
                     hover:bg-purple-700 transition-colors"
        >
          Save City
        </button>
      </div>
    </form>
  );
};

export default FAQ_Form;
