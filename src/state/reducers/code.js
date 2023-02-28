import { BODYHTML, CSS } from "../types/code"

export const initialState = {
  bodyHtml: `
<main>
	<h1>Welcome!</h1>
	<p>
		This window demonstrates how various HTML elements are impacted by modifying the available settings or code. Modify this window by using the "Options" section or by editing the HTML and CSS directly in the sections below.
	</p>
	<p>
		<strong>Note</strong>:
		inputting invalid HTML or CSS can result in undesired results or broken styles - so be sure to check your work!
	</p>
	<h2>Text</h2>
	<p>
		<em>Here's some emphasized text</em>.
		<strong>Here's some bold text</strong>.
		<a href="#">Here's hyperlinked text</a>.
	</p>
	<h2>Lists</h2>
	<div class="list-container">
		<div class="list-container-child">
			Unordered list
			<ul>
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ul>
		</div>
		<div class="list-container-child">
			Ordered list
			<ol>
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ol>
		</div>
	</div>
	<h2>Buttons</h2>
	<div class="button-container">
		<div class="button-container-child">
			<button class="btn">As a button</button>
		</div>
		<div class="button-container-child">
			<a href="#" class="btn">As a link</a>
		</div>
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
			<button type="button" class="btn">Submit</button>
			<!-- Button type changed to "button" to prevent breaking the iFrame, this form is for demonstration only! -->
		</div>
	</form>
</main>`,
  css: `:root {
	--primary: #994100;
	--secondary: #24174b;
	--tertiary: #FFFFFF;
	--general-text-color: #000000;
	--button-text-color: var(--secondary);
	--font-general: 'Jost', sans-serif;
	--font-heading: 'Fira Mono', sans-serif;
	--tm-rounded: 1px solid var(--secondary);
	--tm-radius: 0px;
	font-size: 16px;
}

body {
	font-family: var(--font-general);
	background-color: var(--secondary);
}

main {
	margin: 3rem;
	padding: 0.25rem 1.5rem;
	background-color: var(--tertiary);
	border: var(--tm-rounded);
	border-radius: var(--tm-radius);
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

p,
span,
ul,
ol,
li,
dl,
dt,
dd,
div {
	color: var(--general-text-color)
}

button,
select,
option,
input,
fieldset {
	font-family: var(--font-general);
	border: var(--tm-rounded);
	border-radius: var(--tm-radius);
}

.btn {
	background-color: var(--secondary);
	color: var(--button-text-color);
	border: 1px solid var(--tertiary);
	border-radius: var(--tm-radius);
	text-decoration: none;
	font-size: 1rem;
	padding: 0.25rem 0.5rem;
	transition: all 0.2s ease-out;
}

.btn:hover {
	cursor: pointer;
	background-color: var(--button-text-color);
	color: var(--secondary);
	border: 1px solid var(--secondary);
	transition: all 0.2s ease-out;
}

form,
.list-container,
.button-container {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
}

.form-group,
.list-container-child,
.button-container-child {
	grid-column: span 2 / span 2;
}

@media only screen and (min-width: 768px) {
	.form-group,
	.list-container-child,
	.button-container-child {
		grid-column: span 1 / span 1;
	}
}

.form-group.last {
	grid-column: span 2 / span 2;
}

.form-label {
	display: block;
}
`
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
