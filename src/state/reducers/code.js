import { BODYHTML, CSS } from "../types/code"

export const initialState = {
  bodyHtml: '<main>\n\t<h1>Welcome!</h1>\n\t<p>\n\t\tThis window demonstrates how various HTML elements are impacted by modifying the available settings or code. Modify this window by using the "Options" section or by editing the HTML and CSS directly in the sections below.\n\t</p>\n\t<p>\n\t\t<strong>Note</strong>:\n\t\tinputting invalid HTML or CSS can result in undesired results or broken styles - so be sure to check your work!\n\t</p>\n\t<h2>Text</h2>\n\t<p>\n\t\t<em>Here\'s some emphasized text</em>.\n\t\t<strong>Here\'s some bold text</strong>.\n\t\t<a href="#">Here\'s hyperlinked text</a>.\n\t</p>\n\t<h2>Lists</h2>\n\t<div class="list-container">\n\t\t<div class="list-container-child">\n\t\t\tUnordered list\n\t\t\t<ul>\n\t\t\t\t<li>One</li>\n\t\t\t\t<li>Two</li>\n\t\t\t\t<li>Three</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="list-container-child">\n\t\t\tOrdered list\n\t\t\t<ol>\n\t\t\t\t<li>One</li>\n\t\t\t\t<li>Two</li>\n\t\t\t\t<li>Three</li>\n\t\t\t</ol>\n\t\t</div>\n\t</div>\n\t<h2>Buttons</h2>\n\t<div class="button-container">\n\t\t<div class="button-container-child">\n\t\t\t<button class="btn">As a button</button>\n\t\t</div>\n\t\t<div class="button-container-child">\n\t\t\t<a href="#" class="btn">As a link</a>\n\t\t</div>\n\t</div>\n\t<h2>Form</h2>\n\t<form>\n\t\t<div class="form-group">\n\t\t\t<label for="first_name" class="form-label">First name</label>\n\t\t\t<input type="text" name="first_name" id="first_name" class="form-input" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label for="last_name" class="form-label">Last name</label>\n\t\t\t<input type="text" name="last_name" id="last_name" class="form-input" />\n\t\t</div>\n\t\t<div class="form-group">\n\t\t<fieldset>\n\t\t\t<legend>Select an option:</legend>\n\t\t\t<div>\n\t\t\t\t<input type="radio" id="one" name="number" value="one" checked>\n\t\t\t\t<label for="one">One</label>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<input type="radio" id="Two" name="number" value="Two">\n\t\t\t\t<label for="Two">Two</label>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<input type="radio" id="three" name="number" value="three">\n\t\t\t\t<label for="three">Three</label>\n\t\t\t</div>\n\t\t</fieldset>\n\t\t</div>\n\t\t<div class="form-group">\n\t\t\t<label class="form-label" for="select">Pick a color</label>\n\t\t\t<select for="select" class="form-select">\n\t\t\t\t<option>Please select an option</option>\n\t\t\t\t<option value="Red">Red</option>\n\t\t\t\t<option value="Orange">Orange</option>\n\t\t\t\t<option value="Yellow">Yellow</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class="form-group last">\n\t\t\t<button type="button" class="btn">Submit</button>\n\t\t\t<!-- Button type changed to "button" to prevent breaking the iFrame, this form is for demonstration only! -->\n\t\t</div>\n\t</form>\n</main>',
  css: ":root {\n\t--primary: #994100;\n\t--secondary: #24174b;\n\t--tertiary: #FFFFFF;\n\t--general-text-color: #000000;\n\t--button-text-color: #FFFFFF;\n\t--font-general: Jost, sans-serif;\n\t--font-heading: Fira Mono, sans-serif;\n\t--tm-rounded: 1px solid var(--secondary);\n\t--tm-radius: 0px;\n\tfont-size: 16px;\n}\n\nbody {\n\tfont-family: var(--font-general);\n\tbackground-color: var(--secondary);\n}\n\nmain {\n\tmargin: 3rem;\n\tpadding: 0.25rem 1.5rem;\n\tbackground-color: var(--tertiary);\n\tborder: var(--tm-rounded);\n\tborder-radius: var(--tm-radius);\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\tfont-family: var(--font-heading);\n\tcolor: var(--primary);\n}\n\np,\nspan,\nul,\nol,\nli,\ndl,\ndt,\ndd,\ndiv {\n\tcolor: var(--general-text-color)\n}\n\nbutton,\nselect,\noption,\ninput,\nfieldset {\n\tfont-family: var(--font-general);\n\tborder: var(--tm-rounded);\n\tborder-radius: var(--tm-radius);\n}\n\n.btn {\n\tbackground-color: var(--secondary);\n\tcolor: var(--button-text-color);\n\tborder: 1px solid var(--tertiary);\n\tborder-radius: var(--tm-radius);\n\ttext-decoration: none;\n\tfont-size: 1rem;\n\tpadding: 0.25rem 0.5rem;\n\ttransition: all 0.2s ease-out;\n}\n\n.btn:hover {\n\tcursor: pointer;\n\tbackground-color: var(--button-text-color);\n\tcolor: var(--secondary);\n\tborder: 1px solid var(--secondary);\n\ttransition: all 0.2s ease-out;\n}\n\nform,\n.list-container,\n.button-container {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(2, minmax(0, 1fr));\n\tgap: 1rem;\n}\n\n.form-group,\n.list-container-child,\n.button-container-child {\n\tgrid-column: span 2 / span 2;\n}\n\n@media only screen and (min-width: 768px) {\n\t.form-group,\n\t.list-container-child,\n\t.button-container-child {\n\t\tgrid-column: span 1 / span 1;\n\t}\n}\n\n.form-group.last {\n\tgrid-column: span 2 / span 2;\n}\n\n.form-label {\n\tdisplay: block;\n}\n"
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
