import * as React from "react"

//Redux
import { useDispatch } from "react-redux"
import { setFonts } from "../../state/actions/styles"

const FontSelector = ({ label, elementToHandle, defaultFont }) => {
  const dispatch = useDispatch()
  const handleFontChange = (e, type) => {
    const value = e.target.value
    dispatch(
      setFonts({
        [type]: `'${value}', sans-serif`
      })
    )
  }
  return (
    <>
      <label>{label}</label>
      <br />
      <select
        onChange={e => handleFontChange(e, elementToHandle)}
        defaultValue={defaultFont}
      >
        <option value="Jost">Jost</option>
        <option value="Damion">Damion</option>
        <option value="Fira Mono">Fira Mono</option>
      </select>
    </>
  )
}

export default FontSelector
