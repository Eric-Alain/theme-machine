// React
import React, { useState } from "react"
import PropTypes from "prop-types"

// Redux
import { useDispatch } from "react-redux"
import { loadStore } from "../../state/actions/root"

// Firebase
import { doc, deleteDoc } from "firebase/firestore"

// Components
import ProceedOrCancel from "./ProceedOrCancel"

const ThemePalette = ({ themes, user, db }) => {
  // Redux dispatch
  const dispatch = useDispatch()

  // Manage state for menus where the user is presented with the option to proceed or to cancel (in our case, for loading or deleting themes)
  const [showProceedOrCancel, setShowProceedOrCancel] = useState({})

  const handleProceedOrCancel = (key, bool, arrayOfFunctions) => {
    // Close out other proceed or cancel menus
    let objCopy = { ...showProceedOrCancel }

    for (let item of Object.keys(objCopy)) {
      objCopy[item] = false
    }

    // Show desired proceed or cancel menu
    objCopy = { ...objCopy, [key]: bool }

    // Set the state accordingly
    setShowProceedOrCancel(objCopy)

    // If we have any callback functions to run, run them
    if (arrayOfFunctions) {
      arrayOfFunctions.forEach(func => {
        func()
      })
    }
  }

  // Hanlder function for when user wants to proceed with deleting a theme from their profile
  const handleDelete = async docName => {
    // Try catch operation with firestore
    try {
      // Only run if user is authenticated and has a uid
      if (user.uid) {
        // Reference to specific theme
        const themeRef = doc(db, "users", user.uid, "themes", docName)
        // Delete call
        await deleteDoc(themeRef)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ul className="unstyled text-black dark:text-tertiary-100 transition-all">
      {/* If user's profile has any saved themes, map and display them */}
      {themes ? (
        themes.map((item, i) => {
          const colors = [
            "primary",
            "secondary",
            "tertiary",
            "background",
            "foreground"
          ]

          const { state } = item

          return (
            <li key={i} className="transition-all">
              <div className="flex items-center">
                {/* Color palette and button */}
                <div
                  role="button"
                  title={`Load ${item.themeName} theme`}
                  className="w-full mb-1 p-1 rounded hover:bg-primary-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-tertiary-100 transition-all"
                  onClick={() => handleProceedOrCancel(`load-${i}`, true)}
                >
                  <div className="flex justify-between">
                    <div>{item.themeName}</div>
                    <div className="grid grid-cols-5 gap-1">
                      {/* Make a color tile for each color found in colors array (must match saved state values) */}
                      {colors.map((color, c) => {
                        return (
                          <div
                            key={c}
                            className="h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: item[color] }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Trash bin icon */}
                <div className="group transition-all">
                  <button
                    onClick={() => handleProceedOrCancel(`delete-${i}`, true)}
                    title={`Delete ${item.themeName} theme`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 p-[3px] rounded border border-transparent text-black group-hover:text-[#b91c1c] group-hover:bg-tertiary-100 dark:text-tertiary-100 dark:bg-gray-600 dark:border-gray-400 dark:group-hover:text-tertiary-100 dark:group-hover:bg-gray-900 group-hover:border-tertiary-100 transition-all"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Load theme proceed or cancel */}
              <ProceedOrCancel
                index={`load-${i}`}
                message="Load this theme? Unsaved work will be lost."
                showProceedOrCancel={showProceedOrCancel}
                handleProceedOrCancel={handleProceedOrCancel}
                proceedCallbacks={[() => dispatch(loadStore(state))]}
              />

              {/* Delete theme proceed or cancel */}
              <ProceedOrCancel
                index={`delete-${i}`}
                message="Delete this theme? This action is irreversible."
                showProceedOrCancel={showProceedOrCancel}
                handleProceedOrCancel={handleProceedOrCancel}
                proceedCallbacks={[() => handleDelete(item.themeName)]}
              />
            </li>
          )
        })
      ) : (
        <>
          {/* Otherwise, display a message that says the user doesn't have any saved themes */}
          <p>No themes saved yet.</p>
        </>
      )}
    </ul>
  )
}

ThemePalette.propTypes = {
  themes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default ThemePalette
