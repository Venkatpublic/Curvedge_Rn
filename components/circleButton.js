import React from "react";
import { StyleSheet, Pressable, Image} from "react-native";




const RoundButton =()=>{
  
    return(
    
<Pressable style={styles.roundButton}>
<Image source={require("../assets/upright-arrow.png")} style={styles.arrow}></Image>
</Pressable>

    )
}
const styles 
 =StyleSheet.create({
    roundButton:{height:60,width:60,borderRadius:60,backgroundColor:"#FFF2C7",position:"absolute",right:0,alignItems:"center",justifyContent:"center"},
    arrow:{height:24,width:24}
 })
 export default RoundButton