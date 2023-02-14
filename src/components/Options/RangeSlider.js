import React, { useState } from "react"

const RangeSlider = ({
  min,
  max,
  label,
  value,
  id,
  wrapperClasses,
  labelClasses,
  inputClasses
}) => {
  const [sliderValue, setSliderValue] = useState(value)

  const handleSliderChange = e => {
    console.log(e.target.value)
    setSliderValue(e.target.value)
  }

  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}: <span>{sliderValue} px</span>
      </label>
      <input
        id={id}
        type="range"
        value={sliderValue}
        min={min}
        max={max}
        onChange={handleSliderChange}
        className={inputClasses}
      ></input>
    </div>
  )
}

export default RangeSlider
