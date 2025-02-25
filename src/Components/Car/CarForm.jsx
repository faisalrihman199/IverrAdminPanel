import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAPP } from "../../contexts/Appcontext";
import { FaCarAlt } from "react-icons/fa";
import CarLocationForm from "./CarLocationForm";
import FacilitiesMultiSelect from "./FacilitiesMultiSelect"; // Import the multi-select component
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

const CarForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, getData, saveData } = useAPP();
  const { state } = useLocation();
  const { id } = state || {};

  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [options, setOptions] = useState({
    cities: [],
    carTypes: [],
    carBrands: [],
    facilities: [],
  });

  useEffect(() => {
    getData("car/options")
      .then((res) => {
        console.log("Response :", res.options);
        setOptions(res.options);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [getData]);

  useEffect(() => {
    setValue("latitude", location.latitude);
    setValue("longitude", location.longitude);
  }, [location, setValue]);

  const onSubmit = (data) => {
    data.facilities=JSON.stringify(data.facilities)
    
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        // Append the first selected file for "image"
        formData.append('images', data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    setLoading(true);
    saveData(formData, "car", id)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
          setLocation({ latitude: "", longitude: "" });
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.response?.data?.message || "Error saving car");
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

  const formBg = theme === "dark" ? "dark-bg" : "bg-white";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === "dark" ? "main-dark" : "bg-white";

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
      {/* Row 1: Car Name, Car Number, Car Image, (empty) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="sm:col-span-1 md:col-span-2">
          <RequiredLabel>Car Images</RequiredLabel>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("image", { required: "Car Image is required" })}
            onChange={handleFileChange}
            className={`w-full border border-gray-300 rounded-lg text-sm ${inputBG} file:bg-gray-200 file:border-0 file:py-3 file:px-4`}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
          
        </div>
        <div />
      </div>
      {/* Row 2: Rating, Total Seat, Driver Name, Driver Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
        <div>
          <RequiredLabel>Driver Name</RequiredLabel>
          <input
            type="text"
            {...register("driverName", { required: "Driver Name is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.driverName && (
            <p className="mt-1 text-sm text-red-500">{errors.driverName.message}</p>
          )}
        </div>
        <div>
          <RequiredLabel>Driver Phone</RequiredLabel>
          <input
            type="text"
            {...register("driverPhone", { required: "Driver Phone is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.driverPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.driverPhone.message}</p>
          )}
        </div>
      </div>
      {/* Row 3: AC, Gear System, Facilities Multi-select, Car Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
            <p className="mt-1 text-sm text-red-500">{errors.gearSystem.message}</p>
          )}
        </div>
        {/* Facilities MultiSelect */}
        <div>
          <FacilitiesMultiSelect
            options={options.facilities}
            RequiredLabel={RequiredLabel}
            setValue={setValue}
            register={register}
            theme={theme}
            remove={loading}
            errors={errors}
          />
        </div>
        <div>
          <RequiredLabel>Car Type</RequiredLabel>
          <select
            {...register("carTypeId", { required: "Car Type is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Car Type</option>
            {options.carTypes &&
              options.carTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
          </select>
          {errors.carTypeId && (
            <p className="mt-1 text-sm text-red-500">{errors.carTypeId.message}</p>
          )}
        </div>
      </div>
      {/* Row 4: Car Brand, Car City, Price Type, Fuel Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div>
          <RequiredLabel>Car Brand</RequiredLabel>
          <select
            {...register("carBrandId", { required: "Car Brand is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select Brand</option>
            {options.carBrands &&
              options.carBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
          </select>
          {errors.carBrandId && (
            <p className="mt-1 text-sm text-red-500">{errors.carBrandId.message}</p>
          )}
        </div>
        <div>
          <RequiredLabel>Car City</RequiredLabel>
          <select
            {...register("carCityId", { required: "Car City is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
          >
            <option value="">Select City</option>
            {options.cities &&
              options.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
          {errors.carCityId && (
            <p className="mt-1 text-sm text-red-500">{errors.carCityId.message}</p>
          )}
        </div>
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
            <p className="mt-1 text-sm text-red-500">{errors.priceType.message}</p>
          )}
        </div>
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
            <p className="mt-1 text-sm text-red-500">{errors.fuelType.message}</p>
          )}
        </div>
      </div>
      {/* Row 5: Rent with Driver, Rent without Driver, Engine HP, Driven KM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
        <div>
          <RequiredLabel>Car Total Driven Km</RequiredLabel>
          <input
            type="number"
            {...register("drivenKM", { required: "Total Driven Km is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.drivenKM && (
            <p className="mt-1 text-sm text-red-500">
              {errors.drivenKM.message}
            </p>
          )}
        </div>
      </div>
      {/* Row 6: Car Location */}
      <div className="mt-6">
        <CarLocationForm setLoc={setLocation} theme={theme} />
      </div>
      {/* Row 7: Status, Latitude, Longitude, Minimum Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
            <p className="mt-1 text-sm text-red-500">{errors.latitude.message}</p>
          )}
        </div>
        <div>
          <RequiredLabel>Car Longitude</RequiredLabel>
          <input
            type="text"
            readOnly
            value={location.longitude}
            {...register("longitude", { required: "Car Longitude is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.longitude && (
            <p className="mt-1 text-sm text-red-500">{errors.longitude.message}</p>
          )}
        </div>
        <div>
          <RequiredLabel>Car Minimum Hrs Required</RequiredLabel>
          <input
            type="number"
            {...register("minHrsReq", { required: "Minimum Hours is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.minHrsReq && (
            <p className="mt-1 text-sm text-red-500">
              {errors.minHrsReq.message}
            </p>
          )}
        </div>
      </div>
      {/* Row 8: Description, Pickup Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <RequiredLabel>Car Description</RequiredLabel>
          <textarea
            rows="3"
            {...register("description", { required: "Description is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <RequiredLabel>Car Pickup Address</RequiredLabel>
          <textarea
            rows="3"
            {...register("pickupAddress", { required: "Pickup Address is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} focus:outline-none`}
          />
          {errors.pickupAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.pickupAddress.message}</p>
          )}
        </div>
      </div>
      <div className="mt-16">
        <hr />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#7B2BFF] text-white py-2 px-8 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <BeatLoader color="white" /> : "Add Car"}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
