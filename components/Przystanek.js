import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export default class Przystanek extends React.Component {
  render() {
    return (
      <View style={stylemoje.container}>
        <Text style={stylemoje.text}>{this.props.display}</Text>
      </View>
    );
  }
}
const stylemoje = StyleSheet.create({
  text: {
    color: Colors.defaultTextColor,
  },
  container: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
});
