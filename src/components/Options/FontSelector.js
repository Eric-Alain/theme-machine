import React, { useEffect } from "react"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setFonts } from "../../state/actions/styles"

const FontSelector = ({ label, elementToHandle, fonts, defaultFont }) => {
  const dispatch = useDispatch()

  const reduxCss = useSelector(state => state.code.css)

  const handleFontChange = (e, type) => {
    const value = e.target.value
    dispatch(
      setFonts({
        [type]: `'${value}', sans-serif`
      })
    )
  }

  useEffect(() => {
    dispatch(
      setFonts({
        general: reduxCss
          .match(/(?<=--font-general:[ *])(.*?)(?=;)/gm)
          .toString(),
        heading: reduxCss
          .match(/(?<=--font-heading:[ *])(.*?)(?=;)/gm)
          .toString()
      })
    )
  }, [reduxCss, dispatch])

  return (
    <>
      <label>{label}</label>
      <br />
      <select
        onChange={e => handleFontChange(e, elementToHandle)}
        defaultValue={defaultFont}
        className="appearance-none"
        style={{ fontFamily: fonts[elementToHandle] }}
      >
        <option value="Jost" style={{ fontFamily: `'Jost', sans-serif` }}>
          Jost
        </option>
        <option value="Damion" style={{ fontFamily: `'Damion', sans-serif` }}>
          Damion
        </option>
        <option
          value="Fira Mono"
          style={{ fontFamily: `'Fira Mono', sans-serif` }}
        >
          Fira Mono
        </option>
      </select>
    </>
  )
}

export default FontSelector
