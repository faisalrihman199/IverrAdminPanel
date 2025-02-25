import { useState, useEffect } from "react";

const FacilitiesMultiSelect = ({ options, setValue, register, errors,RequiredLabel, theme,remove }) => {
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState(options || []);


  // Update available options and hidden input when options or selected change
  useEffect(() => {
    setAvailable(options.filter(opt => !selected.find(s => s.id === opt.id)));
    setValue("facilities", selected.map(s => s.id));
  }, [options, selected, setValue]);
  useEffect(()=>{
    setSelected([])
  },[remove])

  const handleSelect = (e) => {
    const facilityId = e.target.value;
    if (!facilityId) return;
    const facility = available.find(f => f.id === parseInt(facilityId, 10));
    if (facility) {
      setSelected(prev => [...prev, facility]);
      setAvailable(prev => prev.filter(f => f.id !== facility.id));
    }
  };

  const removeFacility = (id) => {
    const facility = selected.find(f => f.id === id);
    if (facility) {
      setSelected(prev => prev.filter(f => f.id !== id));
      setAvailable(prev => [...prev, facility]);
    }
  };

  // Conditional classes based on theme
  const formBg = theme === "dark" ? "dark-bg" : "bg-white";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBG = theme === "dark" ? "main-dark" : "bg-white";

  return (
    <div>
          <RequiredLabel>Car Facilities</RequiredLabel>
          <select onChange={handleSelect} value=""  className={`w-full p-3 border border-gray-300 rounded-lg text-sm ${inputBG} cursor-pointer`}
 >
        <option value="">Select Facility</option>
        {available.map(fac => (
          <option key={fac.id} value={fac.id}>
            {fac.name}
          </option>
        ))}
      </select>
      {errors.facilities && (
        <p className="mt-1 text-sm text-red-500">{errors.facilities.message}</p>
      )}
      {/* Display selected facilities as tags */}
      <div className="flex flex-wrap mt-2">
        {selected.map(fac => (
          <div
            key={fac.id}
            className={`${inputBG} rounded-full px-3 py-1 mr-2 mb-2 flex items-center`}
          >
            <span>{fac.name}</span>
            <button
              type="button"
              onClick={() => removeFacility(fac.id)}
              className="ml-1 text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* Hidden input for selected facility IDs */}
      <input
        type="hidden"
        {...register("facilities", { required: "At least one facility is required" })}
        value={selected.map(s => s.id)}
      />
    </div>
  );
};

export default FacilitiesMultiSelect;
