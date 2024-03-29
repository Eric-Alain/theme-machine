// React
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useCallback
} from "react"
import PropTypes from "prop-types"

import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { collection, onSnapshot } from "firebase/firestore"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from "firebase/storage"

import ImageUpload from "../ImageUpload/ImageUpload"
import Snackbar from "../Snackbars/Snackbar"
import ThemePalette from "./ThemePalette"
import ProceedOrCancel from "./ProceedOrCancel"

const UserProfileModal = ({
  auth,
  db,
  storage,
  showModal,
  setShowModal,
  showProceedOrCancel,
  handleProceedOrCancel
}) => {
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

  // Show the save button if user makes changes to Display name or Display image fields
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
                tertiary: colors.tertiary,
                background: colors.background,
                foreground: colors.foreground,
                state: doc.data().state
              })
              setLoadables(arr)
            })
          }
        )

        try {
          // Check if the path even exists first
          listAll(ref(storage, `images/${currentUser.uid}`)).then(list => {
            if (list.items.length > 0) {
              // Find all the prefixes and items.
              getDownloadURL(
                ref(storage, `images/${currentUser.uid}/displayImage`)
              )
                .then(url => {
                  fetch(ref(url))
                    .then(res => res.blob())
                    .then(imageBlob => {
                      const imageFile = new File([imageBlob], "image.jpeg", {
                        type: imageBlob.type
                      })
                      setData({
                        ...data,
                        image: imageFile
                      })
                    })
                })
                .catch(e => {
                  console.log(e)
                })
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, db])

  // Listen for changes in data, if different, show the save button
  useEffect(() => {
    if (!showSave) {
      setShowSave(true)
    }

    // hide snackbar if user starts changing fields again
    if (snackBar.show) {
      setSnackBar({
        ...snackBar,
        show: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.displayName, data.image])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Handle form field changes
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault()

    if (data.displayName && data.displayName.length < 2) {
      setSnackBar({
        ...snackBar,
        variant: "danger",
        show: true,
        message: <p>Display name must be 2 characters or longer.</p>
      })
      return
    }

    // Wait for account to be created, update the user name key based on what was entered in sign up form
    await updateProfile(user, {
      displayName:
        data.displayName.length > 0 ? data.displayName : user.displayName
    })
      .then(async () => {
        try {
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
          } else if (data.image === "") {
            const storageRef = ref(storage, `images/${user.uid}/displayImage`)
            // Check if the path even exists first
            listAll(ref(storage, `images/${user.uid}`)).then(async list => {
              if (list.items.length > 0) {
                deleteObject(storageRef)
              }
            })
          }
          // Call to local storage, setting a time stamp of the last time we updated the display image
          localStorage.setItem("tm-di-storage", new Date())
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("storage"))
          }
        } catch (e) {
          console.log(e)
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
        // console.log(e)
      })
  }

  // Handle delete account
  const handleDeleteAcount = () => {
    // Call delete() method on our auth object (only a logged in/authenticated user can delete their own account)
    auth.currentUser
      .delete()
      .then(() => {
        // If succesful, close the modal (as only authenticated users should have access to the user profile menu)
        setShowModal(false)
      })
      .catch(e => {
        console.log(e)
      })
  }

  // Listen for click outside of modal and close modal
  const upRef = useRef()

  const handleContext = useCallback(
    e => {
      if (upRef.current && !upRef.current.contains(e.target)) {
        setShowModal(false)
      }
    },
    [setShowModal]
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleContext)
    return () => {
      document.removeEventListener("mousedown", handleContext)
    }
  }, [handleContext])

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-[360px] relative my-6 mx-auto">
              {/*content*/}
              <div
                className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none"
                onClick={handleContext}
                ref={upRef}
              >
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
                  <ThemePalette
                    themes={loadables}
                    user={user}
                    db={db}
                    showProceedOrCancel={showProceedOrCancel}
                    handleProceedOrCancel={handleProceedOrCancel}
                  />
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
                          Display name
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          aria-label="displayName"
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
                    <button
                      className="ml-3 btn-danger"
                      type="button"
                      onClick={() => handleProceedOrCancel(`del-acc-1`, true)}
                    >
                      Delete account
                    </button>
                  </div>
                  {/* Delete theme proceed or cancel */}
                  <ProceedOrCancel
                    index={`del-acc-1`}
                    message="<strong>Are you absolutely sure</strong>? This action is irreversible."
                    showProceedOrCancel={showProceedOrCancel}
                    handleProceedOrCancel={handleProceedOrCancel}
                    proceedCallbacks={[() => handleDeleteAcount()]}
                  />
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
