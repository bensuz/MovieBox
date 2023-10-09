import "./GenreSelection.css";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import Select from "react-select";

const GenreSelection = ({ onGenreChange, parsedGenre }) => {
    const genreOptions = [
        {
            value: "adventure",
            label: "Adventure",
            color: "#00B8D9",
        },
        {
            value: "thriller",
            label: "Thriller",
            color: "#0052CC",
        },
        { value: "horror", label: "Horror", color: "#5243AA" },
        { value: "romance", label: "Romance", color: "#FF5630" },
        {
            value: "sci-fi",
            label: "Science-Fiction",
            color: "#FF8B00",
        },
        { value: "comedy", label: "Comedy", color: "#36B37E" },
        { value: "drama", label: "Drama", color: "#FFC400" },
        { value: "mistery", label: "Mistery", color: "#00875A" },
        { value: "muscial", label: "Musical", color: "#253858" },
        { value: "western", label: "Western", color: "#896542" },
        { value: "crime", label: "Chrime", color: "#784569" },
        {
            value: "action",
            label: "Action",
            color: "#00B8D9",
        },
    ];

    let defaultValue = genreOptions.filter((option) =>
        parsedGenre.includes(option.label)
    );
    console.log(defaultValue);

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

    return (
        <Select
            closeMenuOnSelect={false}
            defaultValue={defaultValue}
            isMulti
            options={genreOptions}
            styles={colourStyles}
            // placeholder={[moviegenre] || "Select genres"}
            className="react-select-container border-2 border-white rounded-2xl absolute top-3 left-2 w-full pr-4 pb-2 text-base"
            classNamePrefix="react-select"
            onChange={(selectedGenres) => {
                onGenreChange(selectedGenres);
            }}
        />
    );
};

export default GenreSelection;
