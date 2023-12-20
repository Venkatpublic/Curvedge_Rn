import React, { useEffect } from "react";
import { Text,View ,StyleSheet,Dimensions, Pressable, Image} from "react-native";
import TheCurve from "./components/curve";
import Animated, { Extrapolate, SensorType, interpolate, useAnimatedReaction, useAnimatedSensor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import CircularProgress from "./components/circularProgress";

import TimeTag from "./components/timeTag";
import ProgressBar from "./components/progressBar";
import { degreeToRad } from "./utills";


const CardComp =()=>{
    const val = useSharedValue(-43)
    useEffect(() => {
      val.value = withTiming(0, { duration: 1000 })
    }, [])
 
    const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const roll = useSharedValue(0);
  const pitch = useSharedValue(0);
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, { interval: 50 });
  useAnimatedReaction(
    () => animatedSensor.sensor.value,
    (s) => {
      pitch.value = s.x;
      roll.value = s.y;
    },
    []
  );
  useAnimatedReaction(
    () => [pitch.value, roll.value],
    (values) => {
   
      const rollValue = values[1];
      const deadZoneThreshold = 0.1;
      if(Math.abs(rollValue) < 0.0005){
        rotateY.value = withSpring(0, { mass: 10, damping: 20 })
      }else if(Math.abs(rollValue) > deadZoneThreshold){
       
        rotateY.value = withSpring(interpolate(
          rollValue,
          [-Math.PI, Math.PI],
          [degreeToRad(-40), degreeToRad(40)],
          Extrapolate.CLAMP
        ), { mass: 10, damping: 20 })
      }

   
    },
    []
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [

        { rotateY: `${rotateY.value}rad` },
      ],
      perspective: 1000,
    };
  });
  const animatedParallaxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: rotateY.value * 60 }
     
      ],
    };
  });
    return(
        <Animated.View style={[styles.layout,animatedStyle]}>
<View style={styles.upperBody}>
<View style={styles.timeContainer}>
<Animated.View style={animatedParallaxStyle}>
   <TimeTag></TimeTag>
   </Animated.View>
</View>
<TheCurve fill={"#FFF2C7"} height={92} />


<Pressable style={styles.roundButton}>
<Animated.View style={animatedParallaxStyle}>
<Image source={require("./assets/upright-arrow.png")} style={styles.arrow}></Image>
</Animated.View>
</Pressable>


</View>
<View style={styles.lowerBody}>
<Animated.View style={animatedParallaxStyle}>

<Text  style={styles.typeText}>
On-Ground
</Text>
    </Animated.View>
<Animated.View style={animatedParallaxStyle}>

<Text numberOfLines={1} style={styles.titleText}>
India vs Australia ODI
</Text>
</Animated.View>
<View style={styles.progressConatiner}>
<Animated.View style={animatedParallaxStyle}>
  
<ProgressBar icon ={require("./assets/assigned-icon.png")} progress={100}color={"rgba(85, 156, 255, 1)"}value={200}label={"assigned"}></ProgressBar>
</Animated.View>
<Animated.View style={animatedParallaxStyle}>

<ProgressBar icon ={require("./assets/contacted-icon.png")} progress={80}color={"rgba(159, 167, 255, 1)"}value={160}label={"contacted"}></ProgressBar>
</Animated.View>
<Animated.View style={animatedParallaxStyle}>
  
<ProgressBar icon ={require("./assets/negotation.png")} progress={70}color={"rgba(251, 198, 46, 1)"}value={140}label={"negotiation"}></ProgressBar>
</Animated.View>
<Animated.View style={animatedParallaxStyle}>
 
<ProgressBar icon ={require("./assets/closed-icon.png")} progress={50}color={"rgba(250, 159, 159, 1)"}value={100}label={"closed"}></ProgressBar>
</Animated.View>
</View>
<View style={{width:"100%",alignItems:"center"}}>
<Animated.View style={animatedParallaxStyle}>

<CircularProgress
          size={200}
          strokeWidth={25}
          color="#EE7360"
          progress={val}
        />
        </Animated.View>
        </View>
        <Animated.View style={animatedParallaxStyle}>
  
<Pressable style={styles.moreButton}>
    <Text style={styles.buttonTitle}>Assign More Brands</Text>
</Pressable>
</Animated.View>
</View>

 
        </Animated.View>
    )
}
const styles 
 =StyleSheet.create({
    layout:{height:466,width:328},
    upperBody:{height:75,width:"100%",flexDirection:"row",justifyContent:"space-between"},
    lowerBody:{height:401,width:"100%",backgroundColor:"#FFF2C7",borderBottomLeftRadius:30,borderBottomRightRadius:30,paddingHorizontal:15,paddingTop:0},
    timeContainer:{height:"100%",backgroundColor:"#FFF2C7",flex:1,borderTopLeftRadius:30,padding:15},
    roundButton:{height:60,width:60,borderRadius:60,backgroundColor:"#FFF2C7",position:"absolute",right:0,alignItems:"center",justifyContent:"center"},
    arrow:{height:24,width:24},
    typeText:{fontSize:12,fontWeight:"400",color:"#000000",lineHeight:16.8,textTransform:'uppercase'},
    titleText:{fontSize:24,fontWeight:"600",lineHeight:33.6,color:"#000000"},
    progressConatiner:{flexDirection:"row",width:"90%",alignSelf:"center",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20,marginTop:40},
    moreButton:{backgroundColor:"rgba(0, 148, 255, 1)",height:42,width:"100%",borderRadius:41,marginTop:24,alignItems:"center",justifyContent:"center"},
    buttonTitle:{fontSize:14,fontWeight:"600",color:"rgba(255, 255, 255, 1)",lineHeight:19.6},
    roundButton:{height:60,width:60,borderRadius:60,backgroundColor:"#FFF2C7",position:"absolute",right:0,alignItems:"center",justifyContent:"center"},
    arrow:{height:24,width:24}
 })
 export default CardComp