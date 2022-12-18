//React
import React, { useState, useEffect } from "react"

//Redux
import { useDispatch, useSelector } from "react-redux"
import { setBodyHtml, setCSS } from "../../state/actions/code"

//Editor component
import Editor from "react-simple-code-editor"

//Prismjs syntax highlighter options for editor
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"
import "prismjs/themes/prism-okaidia.css"

const Code = () => {
  const dispatch = useDispatch()
  const reduxBodyHtml = useSelector(state => state.code.bodyHtml)
  const reduxCss = useSelector(state => state.code.css)

  const [localHtml, localSetHtml] = useState(reduxBodyHtml.trim())
  const [localCss, localSetCss] = useState(reduxCss.trim())

  const handleHtmlChange = code => {
    /*Update code state*/
    localSetHtml(code)

    /*Kill any existing timeouts */
    let id = window.setTimeout(() => {}, 1000)
    while (id--) {
      window.clearTimeout(id)
    }
    //Call redux dispatch after timeout
    const dispatchCall = setTimeout(() => {
      dispatch(setBodyHtml(code))
    }, 1000)
    return () => clearTimeout(dispatchCall)
  }

  const handleCssChange = code => {
    /*Update code state*/
    localSetCss(code)

    /*Kill any existing timeouts */
    let id = window.setTimeout(() => {}, 1000)
    while (id--) {
      window.clearTimeout(id)
    }
    //Call redux dispatch after timeout
    const dispatchCall = setTimeout(() => {
      dispatch(setCSS(code))
    }, 1000)
    return () => clearTimeout(dispatchCall)
  }

  useEffect(() => {
    localSetCss(reduxCss)
  }, [reduxCss])

  return (
    <>
      <section className="col-span-12 md:col-span-6">
        <h2>HTML</h2>
        <div className="max-h-[32rem] min-h-[32rem] overflow-y-scroll">
          <Editor
            value={localHtml}
            onValueChange={code => handleHtmlChange(code)}
            highlight={code => highlight(code, languages.markup)}
            padding={16}
            tabSize={5}
            insertSpaces={false}
            className="rounded border border-solid border-primary-300 shadow-none"
            style={{
              backgroundColor: "#292929",
              color: "#ffffff"
            }}
          />
        </div>
      </section>
      <section className="col-span-12 md:col-span-6">
        <h2>CSS</h2>
        <div className="max-h-[32rem] min-h-[32rem] overflow-y-scroll">
          <Editor
            value={localCss}
            onValueChange={code => handleCssChange(code)}
            highlight={code => highlight(code, languages.css)}
            padding={16}
            tabSize={5}
            insertSpaces={false}
            className="rounded border border-solid border-primary-300 shadow-none"
            style={{
              backgroundColor: "#292929",
              color: "#ffffff"
            }}
          />
        </div>
      </section>
    </>
  )
}

export default Code
