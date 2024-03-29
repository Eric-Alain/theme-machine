import React, { useState, useEffect } from "react"
import ColorPicker from "./ColorPicker"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setShape } from "../../state/actions/styles"
import { setColors } from "../../state/actions/styles"

// Components
import FontSelector from "./FontSelector"
import RadioButton from "./RadioButton"
import RangeSlider from "./RangeSlider"
import RadiusDemo from "./RadiusDemo"

// Utils
import { debounce, generateHexVals } from "../../utils"

const Options = () => {
  const dispatch = useDispatch()

  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const reduxCss = useSelector(state => state.code.css)

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleShapeChange = e => {
    dispatch(setShape({ rounded: e.target.checked }))
  }

  const handleRandomizer = () => {
    const hexVals = generateHexVals(5)
    dispatch(setColors(["primary", hexVals[0]]))
    dispatch(setColors(["secondary", hexVals[1]]))
    dispatch(setColors(["tertiary", hexVals[2]]))
    dispatch(setColors(["background", hexVals[3]]))
    dispatch(setColors(["foreground", hexVals[4]]))
  }

  // Combining useState hook with redux state in order to make use of debouncing
  // This way, the range slider works as expected, but the redux state only gets
  // updated 1s after the user is done interacting with it. This reduces the amount
  // of dispatch calls to update the redux store, which could be expensive
  const [sliderValue, setSliderValue] = useState(shape.radius)

  const handleRadiusChange = e => {
    setSliderValue(parseInt(e.target.valueAsNumber))
    debounce(300, [
      () => dispatch(setShape({ radius: e.target.valueAsNumber }))
    ])
  }

  useEffect(() => {
    const borderRadius = parseInt(
      reduxCss.match(/(?<=--tm-radius:[ *])(\d+)(?=[\s\S]*?\t\b)/gm)
        ? parseInt(
            reduxCss.match(/(?<=--tm-radius:[ *])(\d+)(?=[\s\S]*?\t\b)/gm)[0]
          )
        : 0,
      10
    )

    const val = shape.rounded ? borderRadius : 0

    setSliderValue(val)
    dispatch(
      setShape({
        radius: val
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxCss, dispatch])

  useEffect(() => {
    const val = shape.rounded ? shape.radius : 0
    setSliderValue(val)
    dispatch(
      setShape({
        radius: val
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape.rounded, dispatch])

  return (
    <section className="col-span-12 lg:col-span-3 flex flex-col">
      <h2 className="dark:text-tertiary-100">Options</h2>
      <div className="grow rounded border border-solid border-primary-300 pb-3 px-5">
        <form className="my-5" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="h4 border-b border-solid border-primary-300 mb-3 w-full">
              Colors
            </legend>
            <div className="grid grid-rows-3 gap-2">
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-primary"
                  aria-label="theme-primary"
                  id="theme-primary"
                  value={colors.primary}
                />
                <ColorPicker colors={colors} category={"primary"} />
                <label className="ml-3" htmlFor="theme-primary">
                  Primary
                </label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-secondary"
                  aria-label="theme-secondary"
                  id="theme-secondary"
                  value={colors.secondary}
                />
                <ColorPicker colors={colors} category={"secondary"} />
                <label className="ml-3" htmlFor="theme-secondary">
                  Secondary
                </label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-tertiary"
                  aria-label="theme-tertiary"
                  id="theme-tertiary"
                  value={colors.tertiary}
                />
                <ColorPicker colors={colors} category={"tertiary"} />
                <label className="ml-3" htmlFor="theme-tertiary">
                  Tertiary
                </label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-background"
                  aria-label="theme-background"
                  id="theme-background"
                  value={colors.background}
                />
                <ColorPicker colors={colors} category={"background"} />
                <label className="ml-3" htmlFor="theme-background">
                  Background
                </label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-foreground"
                  aria-label="theme-foreground"
                  id="theme-foreground"
                  value={colors.foreground}
                />
                <ColorPicker colors={colors} category={"foreground"} />
                <label className="ml-3" htmlFor="theme-foreground">
                  Foreground
                </label>
              </div>

              <div className="inline-flex items-center">
                <button
                  className="rounded border z-1 relative z-0 p-1 flex bg-tertiary-100 text-primary-900 border-primary-600 hover:bg-primary-900 hover:text-secondary-900 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 transition-all"
                  onClick={handleRandomizer}
                  aria-label="Randomize colors"
                  title="Randomize colors"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 justify-center items-center"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <p className="ml-3">Randomize</p>
              </div>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend className="h4 border-b border-solid border-primary-300 mb-3 w-full">
              Fonts
            </legend>
            <div className="grid grid-rows-2 gap-2">
              <div className="col-span-1">
                <FontSelector
                  fonts={fonts}
                  label="Heading font"
                  elementToHandle="heading"
                  defaultFont={
                    fonts.heading.match(/^.*?(?=,)/gm)
                      ? fonts.heading
                          .match(/^.*?(?=,)/gm)[0]
                          .replace(/^(?:')(.*)(?:')$/, "$1")
                      : fonts.heading
                  }
                />
              </div>
              <div className="col-span-1">
                <FontSelector
                  fonts={fonts}
                  label="General font"
                  elementToHandle="general"
                  defaultFont={
                    fonts.general.match(/^.*?(?=,)/gm)
                      ? fonts.general
                          .match(/^.*?(?=,)/gm)[0]
                          .replace(/^(?:')(.*)(?:')$/, "$1")
                      : fonts.general
                  }
                />
              </div>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend className="h4 border-b border-solid border-primary-300 mb-3 w-full">
              Shape
            </legend>
            <div className="grid grid-rows-2 gap-2">
              <div className="col-span-1">
                <div className="grid grid-cols-6 gap-4 justify-items-start items-end">
                  <div className="col-start-1 col-end-3">
                    <RadioButton
                      label="Rounded"
                      id="shape-radio"
                      value={shape.rounded}
                      handleRadioChange={handleShapeChange}
                      sliderClasses="bg-primary-900 h-6 w-11 border rounded-full peer after:bg-white after:border-tertiary-300 after:h-5 after:w-5 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:border after:rounded-full after:transition-all peer-checked:bg-primary-900 peer-checked:after:bg-secondary-300 peer-checked:after:border-white peer-checked:bg-primary-900 peer-focus:ring-secondary-800 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 dark:bg-gray-900 dark:after:bg-white dark:border-tertiary-100 dark:after:border-tertiary-100 dark:peer-focus:ring-gray-900 dark:peer-checked:after:bg-gray-600 dark:peer-checked:after:bg-gray-600 dark:peer-checked:after:border-tertiary-100 dark:peer-checked:bg-gray-900 dark:peer-focus:ring-tertiary-100"
                    />
                  </div>
                  <div className="col-start-3 col-end-6">
                    <RadiusDemo classes="border-primary-900 dark:border-tertiary-100" />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <RangeSlider
                  min={1}
                  max={50}
                  value={sliderValue}
                  label="Border radius"
                  id="borderRadiusSlider"
                  wrapperClasses=""
                  labelClasses="block"
                  inputClasses="w-2/4 bg-primary-300 accent-secondary-900 appearance-none cursor-pointer range-sm"
                  handleSliderChange={handleRadiusChange}
                  disabled={!shape.rounded}
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  )
}

export default Options
