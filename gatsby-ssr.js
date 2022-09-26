import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}
