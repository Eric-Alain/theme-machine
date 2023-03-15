import React, { useEffect } from "react"
import PropTypes from "prop-types"

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
        general: reduxCss.match(/(?<=--font-general:[ *])(.*?)(?=;)/gm)
          ? reduxCss.match(/(?<=--font-general:[ *])(.*?)(?=;)/gm).toString()
          : `'Jost', sans-serif`,
        heading: reduxCss.match(/(?<=--font-heading:[ *])(.*?)(?=;)/gm)
          ? reduxCss.match(/(?<=--font-heading:[ *])(.*?)(?=;)/gm).toString()
          : `'Jost', sans-serif`
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
        className="appearance-none dark:bg-gray-900"
        style={{ fontFamily: fonts[elementToHandle] }}
      >
        <option value="Damion" style={{ fontFamily: `'Damion', sans-serif` }}>
          Damion
        </option>
        <option
          value="Fira Mono"
          style={{ fontFamily: `'Fira Mono', sans-serif` }}
        >
          Fira Mono
        </option>
        <option value="Jost" style={{ fontFamily: `'Jost', sans-serif` }}>
          Jost
        </option>
        <option
          value="Mouse Memoirs"
          style={{ fontFamily: `'Mouse Memoirs', sans-serif` }}
        >
          Mouse Memoirs
        </option>
        <option
          value="Nova Cut"
          style={{ fontFamily: `'Nova Cut', sans-serif` }}
        >
          Nova Cut
        </option>
        <option value="Roboto" style={{ fontFamily: `'Roboto', sans-serif` }}>
          Roboto
        </option>
        <option
          value="Rubik Dirt"
          style={{ fontFamily: `'Rubik Dirt', sans-serif` }}
        >
          Rubik Dirt
        </option>
        <option value="Ubuntu" style={{ fontFamily: `'Ubuntu', sans-serif` }}>
          Ubuntu
        </option>
        <option
          value="Urbanist"
          style={{ fontFamily: `'Urbanist', sans-serif` }}
        >
          Urbanist
        </option>
        <option value="Viga" style={{ fontFamily: `'Viga', sans-serif` }}>
          Viga
        </option>
      </select>
    </>
  )
}

FontSelector.propTypes = {
  label: PropTypes.string,
  elementToHandle: PropTypes.string,
  fonts: PropTypes.object,
  defaultFont: PropTypes.string
}

export default FontSelector
