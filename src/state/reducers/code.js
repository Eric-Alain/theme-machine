import { BODYHTML, CSS } from "../types/code"
import { htmlEntities } from "../../utils"

export const initialState = {
  bodyHtml: htmlEntities(`<div class="nav-container">
	<div class="nav-bg-overlay"></div>
	<nav>
		<div class="menuToggle">
			<input type="checkbox">
			<span></span>
			<span></span>
			<span></span>
			<div class="logo">
				<a href="#">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="none">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
					</svg>
				</a>
			</div>
			<div class="menu">
				<a href="#" class="menu-item">About</a>
				<a href="#" class="menu-item">Contact</a>
				<a href="#" class="menu-item">Subscribe</a>
			</div>
		</div>
	</nav>
</div>
<main>
	<h1 class="hero-heading">Welcome to <span class="gradient-text">Theme Machine</span></h1>
	<div class="hero">
		<div class="hero-text">
			<p>Want to preview your styles on a website?</p>
			<p>Play around with the options on the left or modify code directly to get a running start on mocking up your site.</p>
			<p>
				This window demonstrates how various HTML elements are impacted by modifying the available settings or code. Modify this window by using the "Options" section or by editing the
				HTML and CSS directly in the sections below.
			</p>
			<p><strong>Note</strong>: inputting invalid HTML or CSS can result in undesired results or broken styles - so be sure to check your work!</p>
			<a href="#features" class="hero-btn">See more</a>
		</div>
		<div class="hero-grid">
			<div class="hero-grid-item"></div>
			<div class="hero-grid-item"></div>
			<div class="hero-grid-item"></div>
			<div class="hero-grid-item"></div>
			<div class="hero-grid-item"></div>
		</div>
	</div>
	<section id="features">
		<h2>Features</h2>
		<div class="tile-grid">
			<!-- Tile one -->
			<div class="tile-grid-item">
				<div class="tile-grid-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<style type="text/css">
							.tile-grid .tile-grid-item:nth-child(1) .tile-grid-icon path {
							fill: url(#gradient1);
							stroke: var(--primary);
							}
						</style>
						<defs>
							<linearGradient id="gradient1" gradientTransform="rotate(-35)">
								<stop offset="5%" stop-color="var(--secondary)" />
								<stop offset="45%" stop-color="var(--tertiary)" />
							</linearGradient>
						</defs>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
					</svg>
				</div>
				<div class="tile-grid-heading">
					<h3>Fast</h3>
					<div class="tile-grid-streak"></div>
				</div>
				<div class="tile-grid-description">
					<p>Don't waste your time setting up basic styles. Simply pick a few options and be on your way!</p>
				</div>
			</div>
			<!-- Tile two -->
			<div class="tile-grid-item">
				<div class="tile-offset-overlay"></div>
				<div class="tile-grid-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<style type="text/css">
							.tile-grid .tile-grid-item:nth-child(2) .tile-grid-icon path {
							fill: url(#gradient2);
							stroke: var(--secondary);
							}
						</style>
						<defs>
							<linearGradient id="gradient2" gradientTransform="rotate(-35)">
								<stop offset="5%" stop-color="var(--tertiary)" />
								<stop offset="45%" stop-color="var(--primary)" />
							</linearGradient>
						</defs>
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
					</svg>
				</div>
				<div class="tile-grid-heading">
					<h3>Realistic</h3>
					<div class="tile-grid-streak"></div>
				</div>
				<div class="tile-grid-description">
					<p>Choosing styles without a point of reference can be difficult. Make decisions based on a real website.</p>
				</div>
			</div>
			<!-- Tile three-->
			<div class="tile-grid-item">
				<div class="tile-grid-icon">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<style type="text/css">
							.tile-grid .tile-grid-item:nth-child(3) .tile-grid-icon path {
							fill: url(#gradient3);
							stroke: var(--primary);
							}
						</style>
						<defs>
							<linearGradient id="gradient3" gradientTransform="rotate(-35)">
								<stop offset="5%" stop-color="var(--secondary)" />
								<stop offset="45%" stop-color="var(--tertiary)" />
							</linearGradient>
						</defs>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
					</svg>
				</div>
				<div class="tile-grid-heading">
					<h3>Fun</h3>
					<div class="tile-grid-streak"></div>
				</div>
				<div class="tile-grid-description">
					<p>It's fun to experiment! Play around with styles freely then export or save your results.</p>
				</div>
			</div>
		</div>
	</section>
	<section id="typography">
		<h2>Typography</h2>
		<p>Welcome to <strong>Theme Machine</strong>, where we turn web design into a work of art! Let's dive into the world of typography and explore the power of HTML tags.</p>
		<p>Picture this: You're scrolling through a website and stumble upon some boring old paragraph. But with <strong>strong text</strong>, you can really make it pop! Emphasize your message with <em>emphasized text</em>, and watch as your words come to life. 
			But why stop there? With the <a href="#">power of links</a>, you can direct your users to other pages or even external sites. The possibilities are endless!
		<p>Organizing information is key, with
		<ul>
			<li>unordered</li>
			<li>lists</li>
			<li>and</li>
		</ul>
	
		<ol>
			<li>ordered</li>
			<li>lists,</li>
		</ol>
		</div>		
		you can keep your content neat and tidy. Lists are not just for groceries, they are also perfect for showing off your content in a structured and organized way.</p>
		<p>With the <button class="btn" onClick="alert('Something happened!')">click of a button</button> , you can make things happen on your website.</p>
		<p>Last but not least, let's talk about forms! Sometimes you simply need to know more about your user. Shake things up and make your form stand out!</p>
		<fieldset>		
			<legend class="form-title">Tell us more about yourself</legend>
			<form>
				<div class="form-group">
					<label for="first_name" class="form-label">First name</label>
					<input type="text" name="first_name" id="first_name" class="form-input">
				</div>
				<div class="form-group">
					<label for="last_name" class="form-label">Last name</label>
					<input type="text" name="last_name" id="last_name" class="form-input">
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
					<select id="select" class="form-select">
						<option>Please select an option</option>
						<option value="Red">Red</option>
						<option value="Orange">Orange</option>
						<option value="Yellow">Yellow</option>
					</select>
				</div>
				<div class="form-group last">
					<button type="button" class="btn" onClick="alert('Submitted!')">Submit</button>
					<!-- Button type changed to "button" to prevent breaking the iFrame, this form is for demonstration only! -->
				</div>
			</form>
		</fieldset>
		<p>Whether it's submitting a form, or just adding some <strong>pizzazz</strong> to your layout, buttons are an essential part of web design.</p>
		<p>So come on, don't be shy! Give your website some personality and use the power of HTML tags to create a masterpiece. With <strong>Theme Machine</strong>, the sky's the limit!</p>
	</section>
</main>`),

  css: htmlEntities(`:root {
	--primary: #f7ef04;
	--secondary: #fa9902;
	--tertiary: #c202fc;
	--background: #000000;
	--foreground: #000000;
	--general-text-color: #ffffff;
	--button-text-color: #ffffff;
	--herobtn-text-color: #ffffff;
	--font-general: Roboto, sans-serif;
	--font-heading: Jost, sans-serif;
	--tm-rounded: 1px solid var(--primary);
	--tm-radius: 0px;
	--font-size: 16px;
	--transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

.gradient-text, strong, em, .form-title {
	background: linear-gradient(120deg, var(--primary), var(--secondary), var(--tertiary));
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

html {
	font-size: var(--font-size);
}

body {
	font-family: var(--font-general);
	background-color: var(--background);
	margin: 0;
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

main {
	margin: 3rem;
	padding: 0.25rem 1.5rem;
	background-color: var(--foreground);
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
	color: var(--general-text-color);
}

/* NAV */

nav {
	display: block;
	padding: 20px 0;
	position: relative;
	z-index: 1;
}

.nav-container {
	position: relative;
	padding: 0 3rem;
	background-color: var(--foreground);
}

.nav-bg-overlay {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	background-color: var(--secondary);
	opacity: 0.25;
	z-index: 0;
}

.menuToggle {
	display: block;
	position: relative;
	z-index: 1;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;
}

.menuToggle a {
	text-decoration: none;
	color: #232323;
	transition: color 0.3s ease;
}

.menuToggle input {
	display: block;
	width: 40px;
	height: 32px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	opacity: 0;
	z-index: 2;
	-webkit-touch-callout: none;
}

.menuToggle span {
	display: block;
	width: 33px;
	height: 4px;
	margin-bottom: 5px;
	position: absolute;
	right: 6px;
	background: #cdcdcd;
	border-radius: 3px;
	z-index: 1;
	transform-origin: 4px 0px;
	transition: var(--transition);
}

.menuToggle span:nth-child(2) {
	top: 8px;
}

.menuToggle span:nth-child(3) {
	top: 16px;
	transform-origin: 0% 0%;
}

.menuToggle span:nth-child(4) {
	top: 24px;
	transform-origin: 0% 100%;
}

.menuToggle input:checked ~ span {
	opacity: 1;
	transform: rotate(45deg) translate(-4px, -20px);
	background: #232323;
}

.menuToggle input:checked ~ span:nth-child(2) {
	transform: rotate(-45deg) translate(-7px, 21px);
}

.menuToggle input:checked ~ span:nth-child(3) {
	opacity: 0;
	transform: rotate(0deg) scale(0.2, 0.2);
}

.menuToggle input:checked ~ .menu {
	height: 6rem;
	transition: var(--transition);
}

.menu {
	position: relative;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 0.5rem;
	align-items: center;
	height: 0;
	overflow: hidden;
	transition: var(--transition);
}

.menu-item {
	font-size: 18px;
	color: var(--primary)!important;
	position: relative;
	text-decoration: none;
	transition: transform ease 0.2s;
}

.logo {
	position: relative;
	margin-bottom: 6px;
}

.logo svg {
	stroke: var(--tertiary);
	fill: var(--secondary);
	height: 3rem;
	width: auto;
}

.menu-item::after,
.logo a::after {
	content: '';
	position: absolute;
	width: 8%;
	transform: scaleX(0);
	height: 2px;
	bottom: 0;
	left: 0;
	background-color: var(--tertiary);
	transform-origin: bottom right;
	transition: transform 0.25s ease-out;
}

.logo a::after {
	width: 12%;
	bottom: -4px;
}

.menu-item:hover::after,
.logo a:hover::after {
	transform: scaleX(1);
	transform-origin: bottom left;
}

/* HERO */

.hero {
	display: grid;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 8rem;
	gap: 1rem;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	grid-template-areas: 'column-2' 'column-1';
}

.hero-heading {
	margin-bottom: 0;
	font-size: calc(var(--font-size) + 14 * ((100vw - 320px) / 680));
	border-bottom: 1px solid var(--tertiary);
}

.hero-btn {
	background-color: var(--tertiary);
	color: var(--herobtn-text-color);
	border: 1px solid var(--primary);
	border-radius: var(--tm-radius);
	text-decoration: none;
	font-size: 1rem;
	padding: 0.5rem 0.75rem;
	transition: var(--transition);
}

.hero-btn:hover {
	cursor: pointer;
	background-color: var(--secondary);
	color: var(--button-text-color);
	border: 1px solid var(--primary);
	transition: var(--transition);
}

.hero-text {
	grid-column: span 1 / span 1;
	grid-area: column-1;
}

.hero-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 6px;
	width: 75%;
	max-width: 180px;
	justify-self: center;
	aspect-ratio: 1 / 1;
	grid-column: span 1 / span 1;
	grid-area: column-2;
	animation: rotation 90s linear infinite;
	margin: 3rem auto 1rem auto;
}

.hero-grid-item {
	min-width: 1px;
	width: 100%;
	border: 1px solid var(--tertiary);
	border-radius: var(--tm-radius);
}

.hero-grid-item:nth-child(1) {
	grid-row-start: 1;
	grid-row-end: 3;
	grid-column-start: 1;
	grid-column-end: 2;
	background: linear-gradient(45deg, var(--secondary) 12%, var(--primary), var(--secondary) 88%);
	background-size: 400% 400%;
	animation: gradient 8s ease-in-out infinite;
}

.hero-grid-item:nth-child(2) {
	grid-row-start: 1;
	grid-row-end: 2;
	grid-column-start: 2;
	grid-column-end: 4;
	background: linear-gradient(45deg, var(--primary) 12%, var(--secondary), var(--primary) 88%);
	background-size: 400% 400%;
	animation: gradient 12s ease-in-out infinite;
}

.hero-grid-item:nth-child(3) {
	grid-row-start: 2;
	grid-row-end: 3;
	grid-column-start: 2;
	grid-column-end: 3;
	background: linear-gradient(45deg, var(--primary), var(--secondary), var(--primary));
	background-size: 600% 30%;
	animation: gradient 8s ease-in-out infinite;
}

.hero-grid-item:nth-child(4) {
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 2;
	grid-row-end: 4;
	background: linear-gradient(45deg, var(--secondary) 12%, var(--primary), var(--secondary) 88%);
	background-size: 400% 400%;
	animation: gradient 8s ease-in-out infinite;
}

.hero-grid-item:nth-child(5) {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	background: linear-gradient(45deg, var(--primary) 12%, var(--secondary), var(--primary) 88%);
	background-size: 400% 400%;
	animation: gradient 12s ease-in-out infinite;
}

/* TILES */

.tile-grid {
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	align-items: flex-start;
	gap: 1rem;
	width: 100%;
}

.tile-grid-item {
	border: 1px solid var(--primary);
	border-radius: var(--tm-radius);
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	padding: 0.75rem;
	min-height: 17rem;
	position: relative;
	transition: var(--transition);
}

.tile-grid-item:hover {
	box-shadow: 0px 2px 4px var(--primary);
	transition: var(--transition);
}

.tile-grid-item:nth-child(2) {
	box-shadow: 0px 2px 4px var(--primary);
	transition: var(--transition);
}

.tile-grid-item:nth-child(2):hover {
	box-shadow: 0px 4px 8px var(--primary);
	transition: var(--transition);
}

.tile-offset-overlay {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: var(--primary);
	opacity: 0.035;
	z-index: 0;
}

.tile-grid-icon svg {
	height: 4rem;
	width: auto;
	z-index: 1;
}

.tile-grid-heading {
	position: relative;
	z-index: 1;
	width: max-content;
	margin: 1rem auto;
}

.tile-grid-heading h3 {
	margin-bottom: 1rem;
}

.tile-grid-heading:after {
	content: '';
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 10px;
	height: 8px;
	width: 190%;
	background-color: var(--secondary);
	border-radius: var(--tm-radius);
	opacity: 0.4;
	z-index: 0;
	box-shadow: -1px 1px 2px grey;
}

.tile-grid-item:nth-child(2) .tile-grid-heading:after {
	background-color: var(--tertiary);
}

.tile-grid-description {
	flex: 1;
	z-index: 1;
}

.tile-grid-description p {
	margin: 0;
}

/* NORMAL ITEMS */

.btn {
	background-color: var(--secondary);
	color: var(--button-text-color);
	border: 1px solid var(--primary);
	border-radius: var(--tm-radius);
	text-decoration: none;
	font-size: 1rem;
	padding: 0.25rem 0.5rem;
	transition: var(--transition);
}

.btn:hover {
	cursor: pointer;
	background-color: var(--tertiary);
	color: var(--herobtn-text-color);
	border: 1px solid var(--primary);
	transition: var(--transition);
}

.form-title {
	font-weight: bold;
	font-size: 1.25rem;
}

form {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
}

.form-group {
	grid-column: span 2 / span 2;
}

.form-group.last {
	grid-column: span 2 / span 2;
}

.form-label {
	display: block;
}

/* MEDIA QUERIES */

@media only screen and (min-width: 640px) {
	.menuToggle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.menuToggle input,
	.menuToggle > span {
		display: none;
	}

	.logo a::after {
		width: 100%;
	}

	.menu {
		height: auto !important;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.menu-item::after {
		width: 50%;
	}

	.hero {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-areas: 'column-1 column-2';
	}

	.hero-text {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.hero-grid {
		width: 60%;
		grid-column-start: 3;
		grid-column-end: 4;
	}

	.tile-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.form-group {
		grid-column: span 1 / span 1;
	}
}

@media only screen and (min-width: 1024px) {
	.hero-grid {
		width: 100%;
	}
}

/* KEYFRAMES */

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}

	33% {
		transform: rotate(0.5deg) scale(0.96);
	}

	50% {
		background-position: 100% 50%;
	}

	66% {
		transform: rotate(-0.5deg) scale(01.02);
	}

	100% {
		background-position: 0% 50%;
	}
}`)
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
