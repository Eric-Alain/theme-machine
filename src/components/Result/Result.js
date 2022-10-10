import * as React from "react"

//Redux
import { useSelector } from "react-redux"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)

  return (
    <>
      <section id="result" className="col-span-12 md:col-span-8">
        <h2>Result</h2>
        <div
          className="rounded border border-solid border-primary-300 pb-3 px-5 overflow-y-scroll max-h-[32rem]"
          style={{ fontFamily: fonts.general }}
        >
          <h3
            className="h1"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 1
          </h3>
          <h3
            className="h2"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 2
          </h3>
          <h3
            className="h3"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 3
          </h3>
          <h3
            className="h4"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 4
          </h3>
          <h3
            className="h5"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 5
          </h3>
          <h3
            className="h6"
            style={{ color: colors.primary, fontFamily: fonts.heading }}
          >
            Heading 6
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    </>
  )
}

export default Result
