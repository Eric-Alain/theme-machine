import * as React from "react"
import ColorPicker from "../ColorPicker/ColorPicker"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setFonts } from "../../state/actions/styles"

//Components
import FontSelector from "./FontSelector"

const Options = () => {
  const dispatch = useDispatch()
  const colors = useSelector(state => state.styles.colors)

  const handleFontChange = (e, type) => {
    const value = e.target.value
    dispatch(
      setFonts({
        [type]: `'${value}', sans-serif`
      })
    )
  }

  return (
    <section className="col-span-12 md:col-span-4 flex flex-col">
      <h2>Options</h2>
      <div className="grow rounded border border-solid border-primary-300 pb-3 px-5">
        <form className="my-5">
          <fieldset>
            <legend>Theme colors</legend>
            <div className="grid grid-cols-3">
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-primary"
                  id="theme-primary"
                  value={colors.primary}
                />
                <label className="mr-3" htmlFor="theme-primary">
                  Primary
                </label>
                <ColorPicker colors={colors} category={"primary"} />
              </div>
              <div className="inline-flex items-center justify-center">
                <input
                  type="hidden"
                  name="theme-secondary"
                  id="theme-secondary"
                  value={colors.secondary}
                />
                <label className="mr-3" htmlFor="theme-secondary">
                  Secondary
                </label>
                <ColorPicker colors={colors} category={"secondary"} />
              </div>
              <div className="inline-flex items-center justify-end">
                <input
                  type="hidden"
                  name="theme-tertiary"
                  id="theme-tertiary"
                  value={colors.tertiary}
                />
                <label className="mr-3" htmlFor="theme-tertiary">
                  Tertiary
                </label>
                <ColorPicker colors={colors} category={"tertiary"} />
              </div>
            </div>
          </fieldset>
          <br />
          <div className="mb-3">
            <FontSelector
              label="Heading font"
              elementToHandle="heading"
              defaultFont="Fira Mono"
            />
          </div>
          <div className="mb-3">
            <FontSelector
              label="General font"
              elementToHandle="general"
              defaultFont="Jost"
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default Options
