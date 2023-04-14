//React
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import PropTypes from "prop-types"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setColors } from "../../state/actions/styles"

//Components
import { SketchPicker } from "react-color"

//Utils
import { lightOrDark } from "../../utils"

const ColorPicker = ({ colors, category }) => {
  const reduxCss = useSelector(state => state.code.css)

  //Local state for component
  const [hide, setHide] = useState(true)
  const [pickerOpen, setPickerOpen] = useState(false)
  const ref = useRef(null)

  //Redux
  const dispatch = useDispatch()

  //Handlers
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

  //useEffect
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  // First use match to extract the color values from reduxCss and store them in their respective variables.
  const primary =
    reduxCss.match(/(?<=--primary:[ *])(.*?)(?=;)/gm)?.toString() || "#000000"

  const secondary =
    reduxCss.match(/(?<=--secondary:[ *])(.*?)(?=;)/gm)?.toString() || "#000000"
  
 const tertiary =
    reduxCss.match(/(?<=--tertiary:[ *])(.*?)(?=;)/gm)?.toString() || "#000000"

    const background =
      reduxCss.match(/(?<=--background:[ *])(.*?)(?=;)/gm)?.toString() ||
      "#000000"

	 const foreground =
     reduxCss.match(/(?<=--foreground:[ *])(.*?)(?=;)/gm)?.toString() ||
     "#000000"

  // We then use useMemo to memoize an array of the color name and value pairs, and pass the primary, secondary, and tertiary variables as dependencies to ensure they are updated when they change.
  const colorsMemo = useMemo(
    () => [
      ["primary", primary],
      ["secondary", secondary],
      ["tertiary", tertiary],
      ["background", background],
      ["foreground", foreground]
    ],
    [primary, secondary, tertiary, background, foreground]
  )

  // We also define a useCallback function that dispatches the setColors action with the memoized colors array as its argument, and memoize the function itself using an empty dependency array to ensure it does not change on re-renders.
  const dispatchColors = useCallback(() => {
    dispatch(setColors(colorsMemo))
  }, [dispatch, colorsMemo])

  // Lastly, we call the dispatchColors function in the useEffect hook to dispatch the setColors action once on component mount and whenever reduxCss changes.
  useEffect(() => {
    dispatchColors()
  }, [reduxCss, dispatch, dispatchColors])

  /*useEffect(() => {
	console.log(reduxCss.match(/(?<=--primary:[ *])(.*?)(?=;)/gm))
    dispatch(
      setColors([
        "primary",
        reduxCss.match(/(?<=--primary:[ *])(.*?)(?=;)/gm)
          ? reduxCss.match(/(?<=--primary:[ *])(.*?)(?=;)/gm).toString()
          : "#000000"
      ])
    )
    dispatch(
      setColors([
        "secondary",
        reduxCss.match(/(?<=--secondary:[ *])(.*?)(?=;)/gm)
          ? reduxCss.match(/(?<=--secondary:[ *])(.*?)(?=;)/gm).toString()
          : "#000000"
      ])
    )
    dispatch(
      setColors([
        "tertiary",
        reduxCss.match(/(?<=--tertiary:[ *])(.*?)(?=;)/gm)
          ? reduxCss.match(/(?<=--tertiary:[ *])(.*?)(?=;)/gm).toString()
          : "#000000"
      ])
    )
  }, [reduxCss, dispatch])*/

  //Hero icons found at https://heroicons.com
  return (
    <>
      <div className="relative z-0">
        <div
          onClick={toggleHide}
          className="rounded border border-primary-600 hover:cursor-pointer z-1 p-1"
          style={{ background: colors[category] }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6"
            style={{ color: lightOrDark(colors[category]) }}
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
            color={colors[category]}
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
