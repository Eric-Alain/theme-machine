//React
import React from "react"
import PropTypes from "prop-types"

const Snackbar = ({ snackObj, setShow }) => {
  const { variant, show, message } = snackObj
  const colors = {
    success: {
      bgColor: "bg-[#4b9d00]",
      textColor: "text-tertiary-100",
      borderColor: "border-tertiary-100",
      hoverBgColor: "hover:bg-tertiary-100",
      hoverTextColor: "hover:text-[#4b9d00]",
      hoverBorderColor: "hover:border-[#4b9d00]",
      offset: "tertiary-100"
    },
    info: {
      bgColor: "bg-[#7100c7]",
      textColor: "text-tertiary-100",
      borderColor: "border-tertiary-100",
      hoverBgColor: "hover:bg-tertiary-100",
      hoverTextColor: "hover:text-[#7100c7]",
      hoverBorderColor: "hover:border-[#7100c7]",
      offset: "tertiary-100"
    },
    warning: {
      bgColor: "bg-[#ffc800]",
      textColor: "text-gray-900",
      borderColor: "border-gray-900",
      hoverBgColor: "hover:bg-gray-900",
      hoverTextColor: "hover:text-[#ffc800]",
      hoverBorderColor: "hover:border-[#ffc800]",
      offset: "gray-900"
    },
    danger: {
      bgColor: "bg-[#c70b0b]",
      textColor: "text-tertiary-100",
      borderColor: "border-tertiary-100",
      hoverBgColor: "hover:bg-tertiary-100",
      hoverTextColor: "hover:text-[#c70b0b]",
      hoverBorderColor: "hover:border-[#c70b0b]",
      offset: "tertiary-100"
    }
  }

  const handleClick = () => {
    setShow({ ...show, show: false })
  }

  return (
    <div
      className={`${!show ? "hidden h-0" : ""}${
        variant in colors ? colors[variant].bgColor : colors["success"].bgColor
      } ${
        variant in colors
          ? `text-${colors[variant].offset}`
          : `text-${colors["success"].offset}`
      } font-bold text-sm transition-all px-4 py-3 rounded max-w-[65ch]`}
      role="alert"
    >
      <div className="flex flex-row items-start justify-between">
        <div>{message}</div>
        <div>
          <button
            onClick={() => handleClick()}
            className={`p-0 m-0 -mt-[1px] ml-2 border ${
              variant in colors
                ? `${colors[variant].bgColor} ${colors[variant].hoverBgColor} ${colors[variant].textColor} ${colors[variant].hoverTextColor} ${colors[variant].borderColor} ${colors[variant].hoverBorderColor}`
                : `${colors["success"].bgColor} ${colors["success"].hoverBgColor} ${colors["success"].textColor} ${colors["success"].hoverTextColor} ${colors["success"].borderColor} ${colors["success"].hoverBorderColor}`
            } transition-colors rounded`}
          >
            <svg
              className="fill-current h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

Snackbar.propTypes = {
  snackObj: PropTypes.object.isRequired,
  setShow: PropTypes.func.isRequired
}

export default Snackbar
