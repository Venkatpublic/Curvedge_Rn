import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function TheCurve(props) {
  return (
    <Svg
      width={92}
      height={92}
      viewBox="0 0 92 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 0c13.513.296 24.082 11.757 23.067 25.162C21.376 47.475 39.222 66.5 61.843 66.5h4.146C80.278 66.5 91.877 77.896 92 92H0V0z" />
    </Svg>
  )
}

export default TheCurve