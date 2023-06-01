// React
import React, { useState, useEffect } from "react"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { setBodyHtml, setCSS } from "../../state/actions/code"

// Editor component
import Editor from "react-simple-code-editor"

// Prismjs syntax highlighter options for editor
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"

import { dark, light } from "./editorStyles"

// Components
import CopyOverlay from "./CopyOverlay"

// Utils
import { debounce, htmlEntities, decodeHtmlEntities } from "../../utils"

const Code = () => {
  const dispatch = useDispatch()

  // Theme selector
  const theme = useSelector(state => state.theme)

  // Redux selectors to trigger useEffect whenever they change
  const reduxBodyHtml = useSelector(state => state.code.bodyHtml)
  const reduxCss = useSelector(state => state.code.css)

  // useState for component rendering
  const [localHtml, localSetHtml] = useState(reduxBodyHtml)
  const [localCss, localSetCss] = useState(reduxCss)

  const handleHtmlChange = code => {
    localSetHtml(decodeHtmlEntities(code))
    debounce(1000, [() => dispatch(setBodyHtml(htmlEntities(code)))])
  }

  const handleCssChange = code => {
    localSetCss(code)
    debounce(1000, [() => dispatch(setCSS(htmlEntities(code)))])
  }

  useEffect(() => {
    localSetHtml(decodeHtmlEntities(reduxBodyHtml))
  }, [reduxBodyHtml])

  useEffect(() => {
    localSetCss(decodeHtmlEntities(reduxCss))
  }, [reduxCss])

  /*****************/
  /*Copy clipboards*/
  /*****************/

  // HTML copy clipboard
  const [htmlClipCopied, setHtmlClipCopied] = useState(false)

  const handleHtmlClipClick = () => {
    navigator.clipboard.writeText(decodeHtmlEntities(reduxBodyHtml))
    setHtmlClipCopied(true)
  }

  useEffect(() => {
    if (htmlClipCopied === true) {
      const timer = setTimeout(() => {
        setHtmlClipCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [htmlClipCopied])

  // CSS copy clipboard
  const [cssClipCopied, setCssClipCopied] = useState(false)

  const handleCssClipClick = () => {
    navigator.clipboard.writeText(decodeHtmlEntities(reduxCss))
    setCssClipCopied(true)
  }

  useEffect(() => {
    if (cssClipCopied === true) {
      const timer = setTimeout(() => {
        setCssClipCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [cssClipCopied])

  return (
    <>
      <style>{theme === "dark" ? dark : light}</style>
      <section className="col-span-12 md:col-span-6 flex flex-col">
        <div className="flex flex-row items-end justify-between relative mb-3">
          <h2 className="mb-0 pb-0 dark:text-tertiary-100">HTML</h2>
          <CopyOverlay
            divClasses="flex items-end"
            buttonClasses="group"
            iconClasses="text-tertiary-100 stroke-primary-900 group-hover:text-primary-900 group-hover:stroke-tertiary-100"
            copied={htmlClipCopied}
            handleClick={handleHtmlClipClick}
          />
        </div>

        <div className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1 relative">
          <Editor
            value={localHtml}
            onValueChange={code => handleHtmlChange(code)}
            highlight={code => highlight(code, languages.markup)}
            insertSpaces={false}
            tabSize={1}
            ignoreTabKey={false}
            padding={12}
            className="language-html bg-white dark:bg-gray-900 z-0 -mt-6"
          ></Editor>
        </div>
      </section>
      <section className="col-span-12 md:col-span-6 flex flex-col">
        <div className="flex flex-row items-end justify-between relative mb-3">
          <h2 className="mb-0 pb-0 dark:text-tertiary-100">CSS</h2>
          <CopyOverlay
            divClasses="flex items-end"
            buttonClasses="group"
            iconClasses="text-tertiary-100 stroke-primary-900 group-hover:text-primary-900 group-hover:stroke-tertiary-100"
            copied={cssClipCopied}
            handleClick={handleCssClipClick}
          />
        </div>
        <div className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1 relative">
          <Editor
            value={localCss}
            onValueChange={code => handleCssChange(code)}
            highlight={code => highlight(code, languages.css)}
            insertSpaces={false}
            tabSize={1}
            ignoreTabKey={false}
            padding={12}
            className="language-css bg-white dark:bg-gray-900 z-0"
          />
        </div>
      </section>
    </>
  )
}

export default Code
