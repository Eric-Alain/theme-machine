//React
import React, { useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"

import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { collection, onSnapshot } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

import ImageUpload from "../ImageUpload/ImageUpload"
import Snackbar from "../Snackbars/Snackbar"

const UserProfileModal = ({ auth, db, storage, showModal, setShowModal }) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  // Snackbar
  const [snackBar, setSnackBar] = useState({
    variant: "success",
    show: false,
    message: null
  })

  // Form controls
  const [data, setData] = useState({
    displayName: "",
    image: "",
    error: null
  })

  // For storing data about our user
  const [user, setUser] = useState(null)

  // Create state variable to store values from our db, will be used to render jsx
  const [loadables, setLoadables] = useState(null)

  const [showSave, setShowSave] = useState(false)

  /************/
  /*VARS/INITS*/
  /************/

  // Context init for snackbar
  const SnackContext = createContext(snackBar)

  /******************/
  /*USE EFFECT HOOKS*/
  /******************/

  // When component mounts, revert some state
  useEffect(() => {
    //console.log("Called")

    if (showModal) {
      setSnackBar({
        ...snackBar,
        variant: "success",
        show: false,
        message: <p></p>
      })
      setShowSave(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])

  useEffect(() => {
    // Subscribe to user authentication
    onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser)
        // Subscribe to database folder changes, but only if our user is authenticated
        onSnapshot(
          collection(db, "users", auth.currentUser.uid, "themes"),
          doc => {
            let arr = []
            doc.forEach(doc => {
              const colors = doc.data().state.styles.colors
              arr.push({
                themeName: doc.id,
                primary: colors.primary,
                secondary: colors.secondary,
                tertiary: colors.tertiary
              })
              setLoadables(arr)
            })
          }
        )

        // Find all the prefixes and items.
        getDownloadURL(ref(storage, `images/${currentUser.uid}/displayImage`))
          .then(url => {
            //console.log(ref(url))
            fetch(ref(url))
              .then(res => res.blob())
              .then(imageBlob => {
                const imageFile = new File([imageBlob], "image.jpeg", {
                  type: imageBlob.type
                })
                //console.log(imageFile)
                setData({
                  ...data,
                  image: imageFile
                })
              })
          })
          .catch(e => {
            //console.log(e)
          })
      }
    })
  }, [auth, db])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Handle form field changes
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
    if (!showSave) {
      setShowSave(true)
    }
  }

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault()
    // Wait for account to be created, update the user name key based on what was entered in sign up form
    await updateProfile(user, {
      displayName:
        data.displayName.length > 0 ? data.displayName : user.displayName
    })
      .then(async () => {
        if (data.image) {
          const storageRef = ref(storage, `images/${user.uid}/displayImage`)
          await uploadBytes(storageRef, data.image).catch(e => {
            setSnackBar({
              ...snackBar,
              variant: "danger",
              show: true,
              message: <p>Error uploading image</p>
            })
          })
        }
      })
      .then(() => {
        // If succesful, display a nice l'il message
        setSnackBar({
          ...snackBar,
          variant: "success",
          show: true,
          message: <p>Changes saved successfully!</p>
        })
        setShowSave(false)
      })
      .catch(e => {
        //console.log(e)
      })
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-[360px] relative my-6 mx-auto">
              {/*content*/}
              <div className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
                  <div>
                    <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                      Profile
                    </h3>
                  </div>
                  <button
                    className="mr-3 bg-transparent text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-tertiary-100 opacity-50 hover:opacity-100 text-3xl block outline-none focus:outline-none transition-all">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative mx-3 mt-3 mb-5 flex-auto">
                  <h4 className="h5 mb-3 mt-0 py-0 text-black dark:text-tertiary-100 border-b primary-300 dark:border-gray-400">
                    Load theme
                  </h4>
                  <ul className="unstyled text-black dark:text-tertiary-100 transition-all">
                    {loadables
                      ? loadables.map((item, i) => {
                          return (
                            <li
                              key={i}
                              className="mb-1 p-1 rounded hover:bg-primary-300 hover:text-black transition-all"
                            >
                              <a href="#test" className="flex justify-between">
                                <div>{item.themeName}</div>
                                <div className="grid grid-cols-3 gap-1">
                                  <div
                                    className="h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                                    style={{ backgroundColor: item.primary }}
                                  ></div>
                                  <div
                                    className="h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                                    style={{ backgroundColor: item.secondary }}
                                  ></div>
                                  <div
                                    className="h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                                    style={{ backgroundColor: item.tertiary }}
                                  ></div>
                                </div>
                              </a>
                            </li>
                          )
                        })
                      : null}
                  </ul>
                  <h4 className="h5 mb-3 py-0 text-black dark:text-tertiary-100 border-b primary-300 dark:border-gray-400">
                    Update profile
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-rows-1 gap-4">
                      <div>
                        <label
                          className="block text-black dark:text-tertiary-100"
                          htmlFor="displayName"
                        >
                          User name
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          className="auth-input"
                          placeholder="Themy Themerton"
                          value={
                            data.displayName !== ""
                              ? data.displayName
                              : user.displayName
                          }
                          onChange={handleChange}
                        />
                      </div>
                      <ImageUpload state={data} setState={setData} />
                      {showSave ? (
                        <div>
                          <button className="btn-main" type="submit">
                            Save changes
                          </button>
                        </div>
                      ) : null}
                      <SnackContext.Provider value={{ snackBar, setSnackBar }}>
                        <Snackbar snackObj={snackBar} setShow={setSnackBar} />
                      </SnackContext.Provider>
                    </div>
                  </form>
                  <h4 className="h5 mb-3 py-0 text-black dark:text-tertiary-100 border-b primary-300 dark:border-gray-400">
                    Account
                  </h4>
                  <div>
                    <button
                      className="btn-main"
                      type="button"
                      onClick={() => {
                        signOut(auth)
                        setShowModal(false)
                      }}
                    >
                      Logout
                    </button>
                    <button className="ml-3 btn-danger" type="button">
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

UserProfileModal.propTypes = {
  auth: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default UserProfileModal
