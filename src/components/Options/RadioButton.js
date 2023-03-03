import * as React from "react"

const RadioButton = ({
  label,
  id,
  value,
  wrapperClasses,
  sliderClasses,
  handleRadioChange
}) => {
  return (
    <div id={id} className={wrapperClasses}>
      {label ? <p>{label}</p> : null}
      <label
        className={`relative flex items-center cursor-pointer${
          label ? " mt-2" : ""
        }`}
      >
        <input
          type="checkbox"
          value={value ? value : false}
          defaultChecked={value === true && value !== undefined ? true : false}
          className="sr-only peer"
          onChange={handleRadioChange}
        />
        <div className={sliderClasses}></div>
      </label>
    </div>
  )
}

export default RadioButton
