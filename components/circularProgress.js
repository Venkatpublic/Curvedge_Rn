import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  size,
  strokeWidth,
  text,
  progress,
  bg,
  color,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * Math.PI; 

  const strokeDashoffset = useDerivedValue(
    () => radius * Math.PI * ((100 - progress.value) / 100),
    [progress]
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  }, [progress, strokeDashoffset]);

  return (
    <View style={{}}>
      <Svg width={size} height={size / 2}>
        <Circle
          stroke={bg ? bg : '#FFFFFF'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />


        <AnimatedCircle
          id={'progress'}
          animatedProps={animatedProps}
          stroke={color ? color : '#3b5998'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`} 
          {...{ strokeWidth }}
        />
      </Svg>

<View style={{position:"absolute",bottom:30,marginLeft:-35,alignItems:"center",justifyContent:"center"}}>
<Image source={require("../assets/tag-icon.png")} style={{height:38,width:90,position:"absolute"}}></Image>
<Text style={{color:"rgba(0, 148, 255, 1)",fontSize:16,fontWeight:"500"}}>₹3.2Cr</Text>
</View>
<View style={{alignItems:"center",position:"absolute",alignSelf:"center",marginTop:50}}>
  <View style={{flexDirection:"row",alignItems:"center"}}>

  <Image source={require("../assets/target.png")} style={{height:17.11,width:19.43,marginRight:4}}></Image>
  <Text style={{fontSize:20,fontWeight:"900",color:"rgba(0, 0, 0, 1)",lineHeight:28}}>10CR</Text>
  </View>
  <Text style={{fontSize:12,fontWeight:"400",color:"rgba(14, 14, 14, 1)",lineHeight:16.8}}>Target Achievement</Text>
</View>
    </View>
  );
};

export default CircularProgress;
