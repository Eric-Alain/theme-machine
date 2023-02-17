import * as React from "react"

const RadioButton = ({ label, id, wrapperClasses, handleRadioChange }) => {

  return (
    <div id={id} className={wrapperClasses}>
      <p>{label}</p>
      <label className="relative inline-flex items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleRadioChange}
        />
        <div className="w-11 h-6 bg-primary-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-800 dark:peer-focus:ring-secondary-300 rounded-full peer dark:bg-primary-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-secondary-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-tertiary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-tertiary-600 peer-checked:bg-primary-900"></div>
      </label>
    </div>
  )
}

export default RadioButton
