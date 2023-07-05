import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, useWindowDimensions} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, useDerivedValue, interpolate } from 'react-native-reanimated';
import { GestureHandlerRootView ,PanGestureHandler } from 'react-native-gesture-handler';

const ROTATION = 60;

const App = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);

  const rotate = useDerivedValue(() => interpolate(
    translateX.value,
    [0, hiddenTranslateX],
    [0, ROTATION], ) + 'deg');

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX : translateX.value,
      },
      {
        rotate: rotate.value,
      }
    ],
    opacity: 120, 
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [{
      scale : interpolate(
        translateX.value, 
        [-hiddenTranslateX ,0, hiddenTranslateX], 
        [1, 0.8, 1]),},
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: () => {
      console.warn('Touch Ended');
    },
  });

  return (
    
      <View style = {styles.pageContainer}>
        <GestureHandlerRootView>
          <View style = {styles.nextCardContainer}> 
            <Animated.View style = {[styles.animatedCard, nextCardStyle]}>
              <Card user = {nextProfile}/>
            </Animated.View>
          </View>
          <PanGestureHandler onGestureEvent = {gestureHandler}>
            <Animated.View style = {[styles.animatedCard, cardStyle]}>
              <Card user = {currentProfile}/>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>  
      </View>
    
  ); 
};

const styles = StyleSheet.create({
  pageContainer : {
    justifyContent: 'center',
    alignItems : 'center',
    flex : 1,
  },
  animatedCard: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems : 'center',
  },
});

export default App;