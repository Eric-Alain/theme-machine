import React, { useState, useEffect } from "react"
import ColorPicker from "../ColorPicker/ColorPicker"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setShape } from "../../state/actions/styles"

//Components
import FontSelector from "./FontSelector"
import RadioButton from "./RadioButton"
import RangeSlider from "./RangeSlider"

//Utils
import { debounce } from "../../utils"

const Options = () => {
  const dispatch = useDispatch()

  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const reduxCss = useSelector(state => state.code.css)

  const handleShapeChange = e => {
    dispatch(setShape({ rounded: e.target.checked }))
  }

  //Combining useState hook with redux state in order to make use of debouncing
  //This way, the range slider works as expected, but the redux state only gets
  //updated 1s after the user is done interacting with it. This reduces the amount
  //of dispatch calls to update the redux store, which could be expensive
  const [sliderValue, setSliderValue] = useState(shape.radius)

  const handleRadiusChange = e => {
    setSliderValue(e.target.value)
    debounce(300, [() => dispatch(setShape({ radius: e.target.value }))])
  }

  useEffect(() => {
    const borderRadius = parseInt(
      reduxCss.match(/(?<=--tm-radius:[ *])(\d+)(?=[\s\S]*?\t\b)/gm)[0],
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
    <section className="col-span-12 md:col-span-4 flex flex-col">
      <h2>Options</h2>
      <div className="grow rounded border border-solid border-primary-300 pb-3 px-5">
        <form className="my-5">
          <fieldset>
            <legend className="h4 border-b border-solid border-primary-300 mb-3 w-full">
              Colors
            </legend>
            <div className="grid grid-rows-3 gap-2">
              <div className="inline-flex items-center">
                <input
                  type="hidden"
                  name="theme-primary"
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
                  id="theme-tertiary"
                  value={colors.tertiary}
                />
                <ColorPicker colors={colors} category={"tertiary"} />
                <label className="ml-3" htmlFor="theme-tertiary">
                  Tertiary
                </label>
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
                  defaultFont={fonts.heading
                    .match(/^.*?(?=,)/gm)[0]
                    .replace(/^(?:')(.*)(?:')$/, "$1")}
                />
              </div>
              <div className="col-span-1">
                <FontSelector
                  fonts={fonts}
                  label="General font"
                  elementToHandle="general"
                  defaultFont={fonts.general
                    .match(/^.*?(?=,)/gm)[0]
                    .replace(/^(?:')(.*)(?:')$/, "$1")}
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
                <RadioButton
                  label="Rounded"
                  id="shape-radio"
                  handleRadioChange={handleShapeChange}
                />
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
