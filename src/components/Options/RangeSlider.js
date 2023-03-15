//React
import * as React from "react"
import PropTypes from "prop-types"

const RangeSlider = ({
  min,
  max,
  label,
  value,
  id,
  wrapperClasses,
  labelClasses,
  inputClasses,
  handleSliderChange,
  disabled
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
        disabled={disabled}
      ></input>
    </div>
  )
}

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.number,
  id: PropTypes.string,
  wrapperClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  inputClasses: PropTypes.string,
  handleSliderChange: PropTypes.func,
  disabled: PropTypes.bool,
  author: PropTypes.string
}

export default RangeSlider
