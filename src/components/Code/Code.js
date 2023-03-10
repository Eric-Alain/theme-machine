//React
import React, { useState, useEffect, useRef } from "react"

//Redux
import { useDispatch, useSelector } from "react-redux"
import { setBodyHtml, setCSS } from "../../state/actions/code"

//Editor component
import Editor from "react-simple-code-editor"

//Prismjs syntax highlighter options for editor
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"

import { dark, light } from "./editorStyles"

//Utils
import { debounce } from "../../utils"

const Code = () => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)
  const reduxBodyHtml = useSelector(state => state.code.bodyHtml)
  const reduxCss = useSelector(state => state.code.css)
  const [localHtml, localSetHtml] = useState(reduxBodyHtml.trim())
  const [localCss, localSetCss] = useState(reduxCss.trim())

  const handleHtmlChange = code => {
    /*Update code state*/
    localSetHtml(code)
    debounce(1000, [() => dispatch(setBodyHtml(code))])
  }

  const handleCssChange = code => {
    /*Update code state*/
    localSetCss(code)
    debounce(1000, [() => dispatch(setCSS(code))])
  }

  useEffect(() => {
    localSetCss(reduxCss)
  }, [reduxCss])

  return (
    <>
      <style>{theme === "dark" ? dark : light}</style>
      <section className="col-span-12 md:col-span-6 flex flex-col">
        <h2 className="dark:text-tertiary-100">HTML</h2>
        <div className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1">
          <Editor
            value={localHtml}
            onValueChange={code => handleHtmlChange(code)}
            highlight={code => highlight(code, languages.markup)}
            insertSpaces={false}
            tabSize={1}
            ignoreTabKey={false}
            className="language-html bg-white dark:bg-gray-900 m-3"
          />
        </div>
      </section>
      <section className="col-span-12 md:col-span-6 flex flex-col">
        <h2 className="dark:text-tertiary-100">CSS</h2>
        <div className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1">
          <Editor
            value={localCss}
            onValueChange={code => handleCssChange(code)}
            highlight={code => highlight(code, languages.css)}
            insertSpaces={false}
            tabSize={1}
            ignoreTabKey={false}
            className="language-css bg-white dark:bg-gray-900 m-3"
          />
        </div>
      </section>
    </>
  )
}

export default Code
