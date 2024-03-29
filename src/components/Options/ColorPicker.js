// React
import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setColors } from "../../state/actions/styles"

// Components
import { SketchPicker } from "react-color"

// Utils
import { lightOrDark } from "../../utils"

const ColorPicker = ({ colors, category }) => {
  const reduxCss = useSelector(state => state.code.css)

  // Local state for component
  const [hide, setHide] = useState(true)
  const [pickerOpen, setPickerOpen] = useState(false)
  const ref = useRef(null)
  const [localColors, setLocalColors] = useState(colors)

  // Redux
  const dispatch = useDispatch()

  // Handlers
  const toggleHide = () => {
    if (pickerOpen) {
      setPickerOpen(false)
      setHide(true)
    } else {
      setPickerOpen(true)
      setHide(false)
    }
  }

  const handleChangeComplete = color => {
    dispatch(setColors([category, color.hex]))
  }

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setHide(true)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  useEffect(() => {
    const colors = [
      { name: "primary", regex: /(?<=--primary:[ *])(.*?)(?=;)/gm },
      { name: "secondary", regex: /(?<=--secondary:[ *])(.*?)(?=;)/gm },
      { name: "tertiary", regex: /(?<=--tertiary:[ *])(.*?)(?=;)/gm },
      { name: "background", regex: /(?<=--background:[ *])(.*?)(?=;)/gm },
      { name: "foreground", regex: /(?<=--foreground:[ *])(.*?)(?=;)/gm }
    ]

    //  set the local colors object
    const extractedColors = colors.reduce((obj, color) => {
      const match = reduxCss.match(color.regex)
      if (match) {
        obj[color.name] = match[0].toString()
      } else {
        obj[color.name] = "#000000"
      }
      return obj
    }, {})

    setLocalColors(extractedColors)

    //  run dispatch calls for specific colors
    const extractedColorsArr = colors.map(color => {
      const match = reduxCss.match(color.regex)
      return [color.name, match ? match[0].toString() : "#000000"]
    })

    extractedColorsArr.forEach(color => {
      dispatch(setColors([color[0], color[1]]))
    })
  }, [reduxCss, dispatch])

  // Hero icons found at https:// heroicons.com
  return (
    <>
      <div className="relative z-0">
        <div
          onClick={toggleHide}
          className="rounded border border-primary-600 hover:cursor-pointer z-1 p-1"
          style={{ background: localColors[category] }}
        >
          <svg
            xmlns="http:// www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6"
            style={{ color: lightOrDark(localColors[category]) }}
          >
            <path
              fillRule="evenodd"
              d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          ref={ref}
          className={`absolute${
            hide ? " hidden w-0" : " w-auto"
          } left-[36px] top-0 z-2`}
        >
          <SketchPicker
            color={localColors[category]}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      </div>
    </>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.object,
  category: PropTypes.string
}

export default ColorPicker
