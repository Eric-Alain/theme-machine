import { BODYHTML, CSS } from "../types/code"

export const initialState = {
  bodyHtml: `<main>
    <h1>Welcome!</h1>
    <p>This page demonstrates various HTML elements and how the code in the windows below impact it. Change the settings by using the "Options" window or by editing the HTML and CSS directly in the windows below.</p>
    <p><strong>Note</strong>: inputting invalid HTML or CSS can result in undesired results or broken styles: so be sure to check your work!</p>

    <h2>Text</h2>
    
    <p><em>Here's some emphasized text</em>. <strong>Here's some bold text</strong>. <a href="#">Here's hyperlinked text</a>.</p>

    <h2>Lists</h2>
    <div class="flex">
      <div class="flex-child">
        Unordered list
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ul>
      </div>
      <div class="flex-child">
        Ordered list
        <ol>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ol>
      </div>
    </div>

    <h2>Buttons</h2>
    <div>
      <button>As a button</button>
    </div>
    <div>
      <a href="">As a link</a>
    </div>

    <h2>Form</h2>
    <form>
      <div class="form-group">
          <label for="first_name" class="form-label">First name</label>
          <input type="text" name="first_name" id="first_name" class="form-input" />
      </div>
      <div class="form-group">
          <label for="last_name" class="form-label">Last name</label>
          <input type="text" name="last_name" id="last_name" class="form-input" />
      </div>
      <div class="form-group">
          <fieldset>
            <legend>Select an option:</legend>
            <div>
              <input type="radio" id="one" name="number" value="one" checked>
              <label for="one">One</label>
            </div>
            <div>
              <input type="radio" id="Two" name="number" value="Two">
              <label for="Two">Two</label>
            </div>
            <div>
              <input type="radio" id="three" name="number" value="three">
              <label for="three">Three</label>
            </div>
        </fieldset>
      </div>
      <div class="form-group">
          <label class="form-label" for="select">Pick a color</label>
            <select for="select" class="form-select">
              <option>Please select an option</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
            </select>
      </div>
      <div class="form-group last">
          <button type="button" class="form-button">Submit</button>
          <!-- Button type changed to "button" to prevent breaking the iFrame, this form is for demonstration only! -->
      </div>
    </form>   
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
    }

    button,
    select,
    option {
      font-family: var(--font-general);
    }

    form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .form-group {
      grid-column: span 1 / span 1;
    }

    .form-group.last {
      grid-column: span 2 / span 2;
    }

    .form-label {
      display: block;
    }

    .form-input {

    }

    .form-select {

    }

    .form-button {

    }
    
    .flex {
      display: flex;
      flex-wrap: wrap;
    }

    .flex-child {
      width: 50%;
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
