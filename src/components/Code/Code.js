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
    debounce(1000, [
      () => dispatch(setCSS(htmlEntities(code)))
    ])
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
  const [htmlClipVis, setHtmlClipVis] = useState(false)
  const [htmlClipCopied, setHtmlClipCopied] = useState(false)

  const handleHtmlClipMouseOver = () => {
    setHtmlClipVis(true)
  }

  const handleHtmlClipMouseOut = () => {
    setHtmlClipVis(false)
  }

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
  const [cssClipVis, setCssClipVis] = useState(false)
  const [cssClipCopied, setCssClipCopied] = useState(false)

  const handleCssClipMouseOver = () => {
    setCssClipVis(true)
  }

  const handleCssClipMouseOut = () => {
    setCssClipVis(false)
  }

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
        <h2 className="dark:text-tertiary-100">HTML</h2>
        <div
          className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1 relative"
          onMouseOver={handleHtmlClipMouseOver}
          onMouseOut={handleHtmlClipMouseOut}
        >
          <CopyOverlay
            divClasses="flex absolute top-1 right-1 z-10"
            buttonClasses="group"
            iconClasses="text-tertiary-100 stroke-primary-900 group-hover:text-primary-900 group-hover:stroke-tertiary-100"
            display={htmlClipVis}
            copied={htmlClipCopied}
            handleClick={handleHtmlClipClick}
          />
          <Editor
            value={localHtml}
            onValueChange={code => handleHtmlChange(code)}
            highlight={code => highlight(code, languages.markup)}
            insertSpaces={false}
            tabSize={1}
            ignoreTabKey={false}
            padding={12}
            className="language-html bg-white dark:bg-gray-900 z-0"
          />
        </div>
      </section>
      <section className="col-span-12 md:col-span-6 flex flex-col">
        <h2 className="dark:text-tertiary-100">CSS</h2>
        <div
          className="rounded border border-solid border-primary-300 overflow-y-scroll scrollbar max-h-[32rem] min-h-[32rem] flex-1 relative"
          onMouseOver={handleCssClipMouseOver}
          onMouseOut={handleCssClipMouseOut}
        >
          <CopyOverlay
            divClasses="flex absolute top-1 right-1 z-10"
            buttonClasses="group"
            iconClasses="text-tertiary-100 stroke-primary-900 group-hover:text-primary-900 group-hover:stroke-tertiary-100"
            display={cssClipVis}
            copied={cssClipCopied}
            handleClick={handleCssClipClick}
          />
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
