import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAPP } from "../../contexts/Appcontext";
import { FaCarAlt } from "react-icons/fa";
import CarLocationForm from "./CarLocationForm";

const CarForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("");
  const { theme } = useAPP();
  const [location,setLocation]=useState({latitude:'', longitude:''});
  useEffect(()=>{
    setValue('latitude', location.latitude);
    setValue('longitude', location.longitude);
  },[location])
  const onSubmit = (data) => {
    const formData = new FormData();
    // Move file into FormData
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    // Append all other fields
    for (const key in data) {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    }
    // Debug
    console.log("Car Form Data:", Object.fromEntries(formData));
    // TODO: Send `formData` to your API endpoint here
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Theming (optional)
  const formBg = theme === 'dark' ? "dark-bg" : "bg-white";
  const labelColor = theme === 'dark' ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === 'dark' ? "main-dark" : "bg-white";

  // A helper to render the red asterisk + label
  const RequiredLabel = ({ children }) => (
    <label className={`block text-sm font-medium ${labelColor} mb-2`}>
      <span className="text-red-500">*</span> {children}
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formBg} w-full p-6 sm:p-10 rounded-2xl shadow-sm`}
    >
      <h2 className={`text-xl flex items-center font-bold ${labelColor}`}>
        <FaCarAlt className="mr-2" /> Car Information
      </h2>
      <div className="my-6">
        <hr />
      </div>

      {/* Row 1 => name, number, image, (empty) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Car Name => name */}
        <div>
          <RequiredLabel>Car Name</RequiredLabel>
          <input
            type="text"
            {...register("name", { required: "Car Name is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Car Number => number */}
        <div>
          <RequiredLabel>Car Number</RequiredLabel>
          <input
            type="text"
            {...register("number", { required: "Car Number is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-500">{errors.number.message}</p>
          )}
        </div>

        {/* Car Image => image */}
        <div className="sm:col-span-1 md:col-span-2" >
          <RequiredLabel>Car Image</RequiredLabel>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Car Image is required" })}
            onChange={handleFileChange}
            className={`w-full border border-gray-300 rounded-lg text-sm ${inputBG} file:bg-gray-200 file:border-0 file:py-3 file:px-4`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
          {fileName && (
            <p className="mt-1 text-sm text-gray-500">Selected: {fileName}</p>
          )}
        </div>

        {/* Empty Column */}
        <div />
      </div>

      {/* Row 2 => rating, seat, driverName, driverPhone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Car Rating => rating */}
        <div>
          <RequiredLabel>Car Rating</RequiredLabel>
          <input
            type="number"
            step="0.1"
            {...register("rating", { required: "Car Rating is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
          )}
        </div>

        {/* Total Seat => seat */}
        <div>
          <RequiredLabel>Total Seat</RequiredLabel>
          <input
            type="number"
            {...register("seat", { required: "Total Seat is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.seat && (
            <p className="mt-1 text-sm text-red-500">{errors.seat.message}</p>
          )}
        </div>

        {/* Driver Name => driverName */}
        <div>
          <RequiredLabel>Driver Name</RequiredLabel>
          <input
            type="text"
            {...register("driverName", { required: "Driver Name is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.driverName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.driverName.message}
            </p>
          )}
        </div>

        {/* Driver Phone => driverPhone */}
        <div>
          <RequiredLabel>Driver Phone</RequiredLabel>
          <input
            type="text"
            {...register("driverPhone", {
              required: "Driver Phone is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.driverPhone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.driverPhone.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 3 => AC, gearSystem, facility, carTypeId */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Car AC => AC (Yes/No) */}
        <div>
          <RequiredLabel>Car AC</RequiredLabel>
          <select
            {...register("AC", { required: "AC selection is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Yes / No</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.AC && (
            <p className="mt-1 text-sm text-red-500">{errors.AC.message}</p>
          )}
        </div>

        {/* Gear System => gearSystem */}
        <div>
          <RequiredLabel>Gear System</RequiredLabel>
          <select
            {...register("gearSystem", { required: "Gear System is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Gear System</option>
            <option value="auto">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          {errors.gearSystem && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gearSystem.message}
            </p>
          )}
        </div>

        {/* Car Facility => facility */}
        <div>
          <RequiredLabel>Car Facility</RequiredLabel>
          <select
            {...register("facility", { required: "Car Facility is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Choose Facility</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="deluxe">Deluxe</option>
          </select>
          {errors.facility && (
            <p className="mt-1 text-sm text-red-500">{errors.facility.message}</p>
          )}
        </div>

        {/* Car Type => carTypeId */}
        <div>
          <RequiredLabel>Car Type</RequiredLabel>
          <select
            {...register("carTypeId", { required: "Car Type is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Car Type</option>
            <option value="1">Sedan</option>
            <option value="2">SUV</option>
            <option value="3">Hatchback</option>
            <option value="4">Luxury</option>
          </select>
          {errors.carTypeId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.carTypeId.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 4 => carBrandId, carCityId, priceType, fuelType */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Car Brand => carBrandId */}
        <div>
          <RequiredLabel>Car Brand</RequiredLabel>
          <select
            {...register("carBrandId", { required: "Car Brand is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Brand</option>
            <option value="1">Toyota</option>
            <option value="2">Honda</option>
            <option value="3">BMW</option>
            <option value="4">Ford</option>
          </select>
          {errors.carBrandId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.carBrandId.message}
            </p>
          )}
        </div>

        {/* Car City => carCityId */}
        <div>
          <RequiredLabel>Car City</RequiredLabel>
          <select
            {...register("carCityId", {
              required: "Available Car City is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select City</option>
            <option value="1">New York</option>
            <option value="2">Los Angeles</option>
            <option value="3">Chicago</option>
            <option value="4">Houston</option>
          </select>
          {errors.carCityId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.carCityId.message}
            </p>
          )}
        </div>

        {/* Car Price Type => priceType (daily/hourly) */}
        <div>
          <RequiredLabel>Car Price Type</RequiredLabel>
          <select
            {...register("priceType", { required: "Car Price Type is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Price Type</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
          {errors.priceType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.priceType.message}
            </p>
          )}
        </div>

        {/* Car Fuel Type => fuelType */}
        <div>
          <RequiredLabel>Car Fuel Type</RequiredLabel>
          <select
            {...register("fuelType", { required: "Car Fuel Type is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="electric">Electric</option>
          </select>
          {errors.fuelType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fuelType.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 5 => rentWithDriver, rentDriverLess, engineHP, drivenKM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Car Rent Price (With Driver) => rentWithDriver */}
        <div>
          <RequiredLabel>Car Rent Price (With Driver)</RequiredLabel>
          <input
            type="number"
            step="0.01"
            {...register("rentWithDriver", {
              required: "Rent price (with driver) is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.rentWithDriver && (
            <p className="mt-1 text-sm text-red-500">
              {errors.rentWithDriver.message}
            </p>
          )}
        </div>

        {/* Car Rent Price (Without Driver) => rentDriverLess */}
        <div>
          <RequiredLabel>Car Rent Price (Without Driver)</RequiredLabel>
          <input
            type="number"
            step="0.01"
            {...register("rentDriverLess", {
              required: "Rent price (without driver) is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.rentDriverLess && (
            <p className="mt-1 text-sm text-red-500">
              {errors.rentDriverLess.message}
            </p>
          )}
        </div>

        {/* Car Engine HP => engineHP */}
        <div>
          <RequiredLabel>Car Engine HP</RequiredLabel>
          <input
            type="text"
            {...register("engineHP", { required: "Car Engine HP is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.engineHP && (
            <p className="mt-1 text-sm text-red-500">
              {errors.engineHP.message}
            </p>
          )}
        </div>

        {/* Car Total Driven Km => drivenKM */}
        <div>
          <RequiredLabel>Car Total Driven Km</RequiredLabel>
          <input
            type="number"
            {...register("drivenKM", {
              required: "Total Driven Km is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.drivenKM && (
            <p className="mt-1 text-sm text-red-500">
              {errors.drivenKM.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <CarLocationForm setLoc={setLocation} theme={theme}  />
      </div>

      {/* Row 6 => status, latitude, longitude, minHrsReq */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Car Status => status */}
        <div>
          <RequiredLabel>Car Status</RequiredLabel>
          <select
            {...register("status", { required: "Car Status is required" })}
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

        {/* Car Latitude => latitude */}
        <div>
          <RequiredLabel>Car Latitude</RequiredLabel>
          <input
            type="text"
            readOnly
            value={location.latitude}
            {...register("latitude", { required: "Car Latitude is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.latitude && (
            <p className="mt-1 text-sm text-red-500">
              {errors.latitude.message}
            </p>
          )}
        </div>

        {/* Car Longitude => longitude */}
        <div>
          <RequiredLabel>Car Longitude</RequiredLabel>
          <input
            type="text"
            readOnly
            value={location.longitude}
            {...register("longitude", {
              required: "Car Longitude is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.longitude && (
            <p className="mt-1 text-sm text-red-500">
              {errors.longitude.message}
            </p>
          )}
        </div>

        {/* Car Minimum Hrs Required => minHrsReq */}
        <div>
          <RequiredLabel>Car Minimum Hrs Required</RequiredLabel>
          <input
            type="number"
            {...register("minHrsReq", {
              required: "Minimum Hours is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.minHrsReq && (
            <p className="mt-1 text-sm text-red-500">
              {errors.minHrsReq.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 7 => description, pickupAddress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Car Description => description */}
        <div>
          <RequiredLabel>Car Description</RequiredLabel>
          <textarea
            rows="3"
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Car Pickup Address => pickupAddress */}
        <div>
          <RequiredLabel>Car Pickup Address</RequiredLabel>
          <textarea
            rows="3"
            {...register("pickupAddress", {
              required: "Pickup Address is required",
            })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.pickupAddress && (
            <p className="mt-1 text-sm text-red-500">
              {errors.pickupAddress.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-16">
        <hr />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full 
                     hover:bg-purple-700 transition-colors"
        >
          Add Car
        </button>
      </div>
    </form>
  );
};

export default CarForm;
