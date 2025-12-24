import React, { useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { ErrorMessage } from "../ErrorMessage";

const sizes = { xs: "pb-0.5 pt-[3px]" };

const SelectBox = React.forwardRef(
  (
    {
      children,
      placeholder = "Select",
      className = "",
      options = [],
      isSearchable = false,
      placeholderClassName = "",
      isMulti = false,
      onChange,
      value = "",
      errors = [],
      indicator,
      shape = "",
      size = "xs",
      variant = "",
      color = "",
      ...restProps
    },
    ref,
  ) => {
    const selectOptions = [{ label: "--select--", value: "" }, ...options];
    // console.log("options : ", options,"selectOptions : ", selectOptions);
    const [selectedVal, setSelectedVal] = React.useState(selectOptions.find((o) => o.value === value) || null);

    const handleChange = (data) => {
      setSelectedVal(data);
      if (isMulti) {
        onChange?.(data?.map((d) => d.value) || []);
      } else {
        onChange?.(data?.value);
      }
    };

    useEffect(() => {
      // console.log("selectedval : ", selectedVal);
    }, [selectedVal]);

    useEffect(()=>{
      setSelectedVal(selectOptions.find((o) => o.value === value) || null);
    
    },[])

    return (
      <>
        <Select
          ref={ref}
          options={selectOptions}
          className={`${className} ${(size && sizes[size]) || ""}`}
          placeholder={
            <div className={placeholderClassName}>{placeholder}</div>
          }
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          value={selectedVal}
          onChange={handleChange}
          styles={{
            // styles object here
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event) => {
            return event.target.id === "scrollContainer";
          }}
          {...restProps}
        />
        <ErrorMessage errors={errors} />
        {children}
      </>
    );
  },
);

SelectBox.propTypes = {
  // propTypes here
};

SelectBox.defaultProps = {
  // defaultProps here
};

export { SelectBox };
