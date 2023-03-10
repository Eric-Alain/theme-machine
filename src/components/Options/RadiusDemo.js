import * as React from "react"

//Redux
import { useSelector } from "react-redux"

const RadiusDemo = ({classes}) => {
  const shape = useSelector(state => state.styles.shape)

  return (
    <div className={`border border-primary-900 w-12 h-6${classes ? ` ${classes}` : ''}`} style={{borderRadius: shape.rounded ? `${shape.radius}px` : '0px'}}></div>
  )
}

export default RadiusDemo
