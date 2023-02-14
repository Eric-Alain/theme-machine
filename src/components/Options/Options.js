import React, { useState, useEffect } from "react"
import ColorPicker from "../ColorPicker/ColorPicker"

//Redux
import { useSelector } from "react-redux"

//Components
import FontSelector from "./FontSelector"
import RangeSlider from "./RangeSlider"

const Options = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)

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
                <p>Rounded</p>
                <label className="relative inline-flex items-center cursor-pointer mt-2">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-primary-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-800 dark:peer-focus:ring-secondary-300 rounded-full peer dark:bg-primary-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-secondary-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-tertiary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-tertiary-600 peer-checked:bg-primary-900"></div>
                </label>
              </div>
              <div className="col-span-1">
                <RangeSlider
                  min={1}
                  max={50}
                  value={2}
                  label="Border radius"
                  id="borderRadiusSlider"
                  wrapperClasses=""
                  labelClasses="block"
                  inputClasses="w-2/4 bg-primary-300 accent-secondary-900 appearance-none cursor-pointer range-sm"
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
