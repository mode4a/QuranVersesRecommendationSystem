import React from "react";
import Select from "react-select";
import { VerseParameters } from "../types/types";
import {
  themeOptions,
  audienceOptions,
  lengthOptions,
  toneOptions,
  locationOptions,
} from "../data/parameterOptions";

interface ParameterSelectorProps {
  parameters: VerseParameters;
  onChange: (category: keyof VerseParameters, value: string) => void;
}

const ParameterSelector: React.FC<ParameterSelectorProps> = ({
  parameters,
  onChange,
}) => {
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: "#E2E8F0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#CBD5E1",
      },
    }),
    option: (
      provided: any,
      state: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#047857"
        : state.isFocused
        ? "#ECFDF5"
        : null,
      color: state.isSelected ? "white" : "#1F2937",
    }),
  };

  const handleChange =
    (category: keyof VerseParameters) => (selectedOption: any) => {
      onChange(category, selectedOption ? selectedOption.value : "");
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Theme</label>
        <Select
          isClearable
          placeholder="Select theme..."
          options={themeOptions}
          onChange={handleChange("theme")}
          styles={customSelectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
          aria-label="Select theme"
        />
        <p className="text-xs text-gray-400">Main subject of the verse</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Audience
        </label>
        <Select
          isClearable
          placeholder="Select audience..."
          options={audienceOptions}
          onChange={handleChange("audience")}
          styles={customSelectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
          aria-label="Select audience"
        />
        <p className="text-xs text-gray-400">
          Intended recipients of the message
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Length
        </label>
        <Select
          isClearable
          placeholder="Select length..."
          options={lengthOptions}
          onChange={handleChange("length")}
          styles={customSelectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
          aria-label="Select verse length"
        />
        <p className="text-xs text-gray-400">Preferred verse length</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Tone</label>
        <Select
          isClearable
          placeholder="Select tone..."
          options={toneOptions}
          onChange={handleChange("tone")}
          styles={customSelectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
          aria-label="Select verse tone"
        />
        <p className="text-xs text-gray-400">Emotional quality of the verse</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Location
        </label>
        <Select
          isClearable
          placeholder="Select location..."
          options={locationOptions}
          onChange={handleChange("location")}
          styles={customSelectStyles}
          className="react-select-container"
          classNamePrefix="react-select"
          aria-label="Select revelation location"
        />
        <p className="text-xs text-gray-400">
          Revelation period (Makkah/Madinah)
        </p>
      </div>
    </div>
  );
};

export default ParameterSelector;
