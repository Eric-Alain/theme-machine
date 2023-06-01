// React
import * as React from "react"
import PropTypes from "prop-types"

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
          aria-label="radio button"
          value={value ? value : false}
          checked={value ? value : false}
          className="sr-only peer"
          onChange={handleRadioChange}
        />
        <div className={sliderClasses}></div>
      </label>
    </div>
  )
}

RadioButton.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.bool,
  wrapperClasses: PropTypes.string,
  sliderClasses: PropTypes.string,
  handleRadioChange: PropTypes.func
}

export default RadioButton
