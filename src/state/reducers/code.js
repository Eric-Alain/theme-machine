import { BODYHTML, CSS } from "../types/code"

export const initialState = {
  bodyHtml: `<main>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </main>
  `,
  css: `:root {
        --primary: #5800a1;
        --secondary: #a10572;
        --tertiary: #f8f8f8;
        --font-general: 'Jost', sans-serif;
        --font-heading: 'Jost', sans-serif;
    }
    body {
      font-family: var(--font-general);
      background-color: var(--secondary);
    }
      main {
      margin: 3rem;
      padding: 0.25rem 1.5rem;
      background-color: var(--tertiary)
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--font-heading);
        color: var(--primary);
    }`
}

const codeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case BODYHTML:
      return {
        ...state,
        bodyHtml: payload
      }
    case CSS:
      return {
        ...state,
        css: payload
      }

    default:
      return state
  }
}

export default codeReducer
