import React from "react";
import { StyleSheet, Text,View ,Image} from "react-native";
import Animated from "react-native-reanimated";
const TimeTag =({animation})=>{
    return(
        <Animated.View style={[styles.container,{animation}]}>
<Image style={styles.icon} source={require("../assets/clock.png")}></Image>
<Text style={styles.text}>2m 16d left</Text>
        </Animated.View>
    )
}
const styles =StyleSheet.create({
    container:{height:37,width:119,backgroundColor:"#2A2A2A",borderRadius:61,flexDirection:"row",justifyContent:"center",alignItems:"center"},
    icon:{height:16,width:16,marginRight:4},
    text:{fontSize:14,color:"#FFFFFF",fontWeight:"500",lineHeight:19.6}
})
export default TimeTag