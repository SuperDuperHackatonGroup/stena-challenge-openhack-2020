import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native';
import Images from './Images.js';

export default function App() {





  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>reclaim</Text>

    </View>

    <Image
    style={styles.product}
    source={require('./images/chair.jpg')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#175',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    backgroundColor: '#560',
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginTop: '10%',
    flex: 1,
    fontSize: 50,
  },
  product: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 2,

  }

});
