import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {Dimensions} from 'react-native'

export default class Screen extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerDiv}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={this.props.navigation.openDrawer}
          >
            <FontAwesome5 name="bars" size={32} color="#161924" />
        </TouchableOpacity>
        <Text style={styles.header}>reclaim</Text>
        </View>
        

          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.text}>{this.props.name} Screen </Text>
          </View>
        </SafeAreaView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#52C800'
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500"
  },
  hamburger: {
    flex: 1,
    width: Dimensions.get('window').width / 15,
    alignItems: 'flex-start',
    margin: 8,
  },
  header: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginRight: Dimensions.get('window').width / 2.45,
    marginTop: 5
  },
  headerDiv: {
    flexDirection:"row",
    justifyContent: "center"
  }

})
