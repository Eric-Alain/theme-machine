import React, { useRef } from "react"

const ImageUpload = ({ state, setState }) => {
  const inputRef = useRef(null)

  const handleFileChange = e => {
    const fileObj = e.target.files && e.target.files[0]
    if (!fileObj) {
      return
    }
    setState({ ...state, image: fileObj })
  }

  const handleRemove = () => {
    setState({ ...state, image: null })
    inputRef.current.value = null
  }

  return (
    <>
      <div>
        <label
          className="block text-black dark:text-tertiary-100"
          htmlFor="profile-picture"
        >
          Profile picture
        </label>
        <input
          ref={inputRef}
          type="file"
          name="profile-picture"
          className="auth-input"
          onChange={handleFileChange}
        />
      </div>
      {state.image && (
        <div>
          <img
            alt=""
            width={"250px"}
            className="mb-3 w-3/5 border border-primary-300 dark:border-gray-400 rounded"
            src={URL.createObjectURL(state.image)}
          />
          <button className="btn-main" onClick={handleRemove}>
            Remove
          </button>
        </div>
      )}
    </>
  )
}

export default ImageUpload
