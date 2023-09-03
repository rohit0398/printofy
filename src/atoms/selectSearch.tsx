import React from "react";
import { Controller } from "react-hook-form";
import type { Props as SelectProps } from "react-select";
import Select from "react-select";
import { get } from "lodash";

interface MultiSelectSearchProps<Option> {
  options: SelectProps<Option>["options"];
  name: string;
  label?: string;
  control: any;
  formState: any;
  placeholder?: string;
  isMulti?: boolean;
  rules?: any;
}
const MultiSelectSearch = <Option extends { label: string; value: string }>({
  options,
  name,
  label,
  control,
  formState,
  placeholder,
  isMulti = false,
  rules = {},
}: MultiSelectSearchProps<Option>) => {
  const error: any = get(formState?.errors, name) as any;
  return (
    <div className="mb-4 text-left">
      {label && (
        <label
          htmlFor={name}
          className=" mb-2 flex font-medium text-medium-gray"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            options={options}
            isMulti={isMulti}
            inputId={name}
            instanceId={name}
            placeholder={placeholder}
            {...field}
            className={`rounded-md focus:ring ${
              error ? "!border-red-500" : "!border-light-gray"
            }`}
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                borderColor: isFocused ? "#F9FAFB" : "#6B6880",
                boxShadow: "none",
                outlineColor: "white",
                backgroundColor: "black",
                color: "white",
                opacity: 1,
                ":hover": {
                  ...baseStyles[":hover"],
                  borderColor: isFocused ? "#F9FAFB" : "#6B6880",
                },
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "white",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "black",
                borderColor: "#6B6880",
                borderWidth: 2,
                color: "white",
              }),
              option: (styles, { isSelected }) => {
                return {
                  ...styles,
                  color: "white",
                  backgroundColor: isSelected ? "gray" : "black",
                  ":active": {
                    ...styles[":active"],
                    backgroundColor: isSelected ? "gray" : "black",
                  },
                  ":hover": {
                    ...styles[":hover"],
                    backgroundColor: "gray",
                  },
                };
              },
            }}
          />
        )}
      />

      {error && <p className="text-red-500">{error?.message}</p>}
    </div>
  );
};

export default MultiSelectSearch;
