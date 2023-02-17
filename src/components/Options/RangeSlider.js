import * as React from "react"

const RangeSlider = ({
  min,
  max,
  label,
  value,
  id,
  wrapperClasses,
  labelClasses,
  inputClasses,
  handleSliderChange
}) => {
  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}: <span>{value} px</span>
      </label>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={handleSliderChange}
        className={inputClasses}
      ></input>
    </div>
  )
}

export default RangeSlider
