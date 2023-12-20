import React, { useEffect } from "react";
import { Text ,Image, StyleSheet,View} from "react-native";
import Animated ,{ useSharedValue, withTiming} from "react-native-reanimated";

const ProgressBar =({icon,progress,color,value,label})=>{
    const heightOne = useSharedValue(55)
    const heightTwo = useSharedValue(0)
    useEffect(() => {
        const value = 55 -(progress/100)*55
        heightOne.value = withTiming(value, { duration: 1000 })
      heightTwo.value = withTiming((progress/100)*55, { duration: 1000 })
    }, [])
    return(
        <View style={styles.container}>
         <View style={{height:55,width:44,marginBottom:4}}>
      
            <Animated.View style={[{height:heightOne,backgroundColor:"rgba(255, 242, 199, 1)",width:44}]}>
       
            </Animated.View>
            <Animated.View style={[{height:heightTwo,backgroundColor:color,width:44}]}>
            <Image source={icon} style={styles.icon}></Image>
         </Animated.View>
         </View>
            

<Text style={styles.count}>{value}</Text>
<Text style={styles.label}>{label}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{alignItems:"center"},

    icon:{height:20,width:20,alignSelf:"center",marginTop:-24},
    count:{fontSize:16,fontWeight:"800",color:"rgba(0, 0, 0, 0.8)",lineHeight:22.4},
    label:{fontSize:12,fontWeight:"400",color:"rgba(0, 0, 0, 1)",lineHeight:16.8,textTransform:"capitalize"},
})
export default ProgressBar