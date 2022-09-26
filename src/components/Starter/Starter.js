import * as React from "react"

//Redux
import { useDispatch, useSelector } from "react-redux"
import { setStarter } from "../../state/actions/starter"

const Starter = () => {
  //Redux
  const dispatch = useDispatch()
  const starter = useSelector(state => state.starter.data)

  const handleChange = e => {
    e.preventDefault()
    dispatch(setStarter(e.target.value))
  }

  return (
    <>
      <input type="text" onChange={handleChange} />
      <br />
      <p>
        {starter
          ? starter
          : "I should contain redux state when typing in the input field."}
      </p>
    </>
  )
}

export default Starter
