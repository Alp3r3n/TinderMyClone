import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated';
import { GestureHandlerRootView ,PanGestureHandler } from 'react-native-gesture-handler';

const App = () => {

  const translateX = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX : translateX.value,
      },
    ],
    opacity: 120, 
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: _ => {
      console.warn('Touch start');
    },
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      console.warn('Touch Ended');
    },
  });

  return (
    
      <View style = {styles.pageContainer}>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent = {gestureHandler}>
            <Animated.View style = {[styles.animatedCard, cardStyle]}>
              <Card user = {users[2]}/>
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
    justifyContent: 'center',
    alignItems : 'center',
  },
});

export default App;