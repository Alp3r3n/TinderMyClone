import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Card from './src/components/TinderCard';

const App = () => {
  return (
    <View style = {styles.pageContainer}>
      <Card />
      
      </View>
  ); 
};

const styles = StyleSheet.create({
  pageContainer : {
    justifyContent: 'center',
    alignItems : 'center',
    flex : 1,
  },
});

export default App;