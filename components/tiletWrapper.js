import React from 'react';
import Animated, { SensorType, useAnimatedReaction, useAnimatedSensor, useAnimatedStyle, useSharedValue, interpolate, Extrapolate, withSpring } from 'react-native-reanimated';
import { degreeToRad } from '../utills';
export const ParentWrapper = ({children}) => {

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
      const pitchValue = values[0];
      const rollValue = values[1];
      const deadZoneThreshold = 0.2;
      if (Math.abs(pitchValue) > deadZoneThreshold || Math.abs(rollValue) > deadZoneThreshold) {
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

  return (
    <Animated.View style={[animatedStyle]}>
{children}
      
     
    </Animated.View>
  );
};
export const ChildWrapper = ({children}) => {

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
        const pitchValue = values[0];
        const rollValue = values[1];
        const deadZoneThreshold = 0.3;
        if (Math.abs(pitchValue) > deadZoneThreshold || Math.abs(rollValue) > deadZoneThreshold) {
          
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
  
    const animatedParallaxStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: rotateY.value * 60 }
        ],
      };
    });
    return (
     

        <Animated.View style={[ animatedParallaxStyle]}>
        {children}
        </Animated.View>
       
    
    );
  };


