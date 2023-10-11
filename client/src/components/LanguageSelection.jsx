//languageselection component for new movie and update movie components

import "./LanguageSelection.css";
import chroma from "chroma-js";
import Select from "react-select";

const LanguageSelection = ({ onLanguageChange, language }) => {
    const LanguageOptions = [
        {
            value: "English",
            label: "English",
            color: "#00B8D9",
        },
        {
            value: "French",
            label: "French",
            color: "#0052CC",
        },
        { value: "German", label: "German", color: "#5243AA" },
        { value: "Spanish", label: "Spanish", color: "#FF5630" },
        {
            value: "Italian",
            label: "Italian",
            color: "#FF8B00",
        },
        { value: "Chinese", label: "Chinese", color: "#36B37E" },
        { value: "Indian", label: "Indian", color: "#FFC400" },
        { value: "Turkish", label: "Turkish", color: "#00875A" },
        { value: "Russian", label: "Russian", color: "#253858" },
        { value: "Portuguese", label: "Portuguese", color: "#896542" },
        { value: "Greek", label: "Greek", color: "#784569" },
    ];

    const colourStyles = {
        control: (base) => ({
            ...base,
            border: 0,
            // This line disable the blue border
            boxShadow: "none",
        }),
        option: (styles, { isDisabled, isFocused, isSelected, data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ":hover": {
                backgroundColor: data.color,
                color: "white",
            },
        }),
    };

    let defaultValue = LanguageOptions.filter((option) =>
        language?.includes(option.label)
    );
    console.log(defaultValue);

    return (
        <Select
            closeMenuOnSelect={true}
            defaultValue={defaultValue}
            isMulti={false}
            options={LanguageOptions}
            styles={colourStyles}
            // placeholder={language || "Select movie language"}
            className="react-select-container border-white rounded-2xl absolute top-3 left-2 w-full pr-4 pb-2 text-base"
            classNamePrefix="react-select"
            onChange={(selectedLanguage) => {
                onLanguageChange(selectedLanguage);
            }}
        />
    );
};

export default LanguageSelection;
