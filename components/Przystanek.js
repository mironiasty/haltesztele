import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default class Przystanek extends React.Component {
  render() {
    return <Text style={stylemoje.text}>{this.props.display}</Text>;
  }
}
const stylemoje = StyleSheet.create({
  text: {
    color: 'darkgreen',
  },
});
