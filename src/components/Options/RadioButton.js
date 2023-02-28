import * as React from "react"

const RadioButton = ({
  label,
  id,
  wrapperClasses,
  sliderClasses,
  handleRadioChange
}) => {
  return (
    <div id={id} className={wrapperClasses}>
      {label ? <p>{label}</p> : null}
      <label className={`relative flex items-center cursor-pointer${label ? ' mt-2' : ''}`}>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleRadioChange}
        />
        <div className={sliderClasses}></div>
      </label>
    </div>
  )
}

export default RadioButton
