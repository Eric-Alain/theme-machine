import React, { useState } from "react"
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

  const handleShapeChange = e => {
    dispatch(setShape({ rounded: e.target.checked }))
  }

  const [sliderValue, setSliderValue] = useState(shape.radius)

  const handleRadiusChange = e => {
    setSliderValue(e.target.value)
    debounce(1000, [() => dispatch(setShape({ radius: e.target.value }))])
  }

  return (
    <section className="col-span-12 md:col-span-4 flex flex-col">
      <h2>Options</h2>
      <div className="grow rounded border border-solid border-primary-300 pb-3 px-5">
        <form className="my-5">
          <fieldset>
            <legend className="h4">Colors</legend>
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
            <legend className="h4">Fonts</legend>
            <div className="grid grid-rows-2 gap-2">
              <div className="col-span-1">
                <FontSelector
                  label="Heading font"
                  elementToHandle="heading"
                  defaultFont={fonts.heading.match(/^.*?(?=,)/gm)[0]}
                />
              </div>
              <div className="col-span-1">
                <FontSelector
                  label="General font"
                  elementToHandle="general"
                  defaultFont={fonts.general.match(/^.*?(?=,)/gm)[0]}
                />
              </div>
            </div>
          </fieldset>
          <br />
          <fieldset>
            <legend className="h4">Shape</legend>
            <div className="grid grid-rows-2 gap-2">
              <div className="col-span-1">
                <RadioButton
                  label="Rounded"
                  id="shape-radio"
                  handleRadioChange={handleShapeChange}
                />
              </div>
              <div className="col-span-1">
                {/*Seems silly, but can't use shape.radius to control range slider component, only works with useState*/}
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
