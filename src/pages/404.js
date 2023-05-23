// React
import * as React from "react"

// Gatsby
import { Link } from "gatsby"

// Components
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <div className="container mx-auto pt-1 pb-5 px-5 bg-tertiary-100 dark:bg-gray-900 dark:text-tertiary-100 border border-primary-300 rounded">
      <h1 className="dark:text-tertiary-100">404 - Not found</h1>
      <p className="mb-3">There's definitely no themes here.</p>
      <p>
        Return to{" "}
        <Link
          to="/"
          className="underline text-primary-900 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-900 transition-all"
        >
          home
        </Link>
        .
      </p>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404 - Not found" />

export default NotFoundPage
