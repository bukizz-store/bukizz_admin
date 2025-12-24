import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "../../components/ErrorMessage";

const variants = {
  fill: {
    white_A700: "bg-white-A700",
    blue_50: "bg-blue-50 text-blue_gray-900",
  },
  underline: {
    blue_gray_100: "border-b border-blue_gray-100 text-black-900_01",
  },
};
const shapes = { round: "rounded-md" };
const sizes = {
  sm: "pb-[13px] pr-[13px] pt-3.5",
  xs: "p-[13px]",
  md: "pb-[18px] pr-[17px] pt-[17px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      onChange,
      isFloat = false,
      shape = "",
      size = "sm",
      variant = "fill",
      color = "white_A700",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        if (type == "number") {
          if (isFloat) {
            onChange({
              target: { name, value: parseFloat(e.target.value) },
            });
          } else {
            onChange({
              target: { name, value: parseInt(e.target.value, 10) },
            });
          }
        } else {
          onChange(e);
        }
      }
    };

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ""} 
              ${variants[variant]?.[color] || ""} 
              ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "xs", "md"]),
  variant: PropTypes.oneOf(["fill", "underline"]),
  color: PropTypes.oneOf(["white_A700", "blue_50", "blue_gray_100"]),
};

export { Input };
