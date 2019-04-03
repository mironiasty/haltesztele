import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';
import BusPicture from '../assets/images/scholar-bus-stop.png';
import TramPicture from '../assets/images/tram-stop.png';

export default class Przystanek extends React.Component {
  getPicture() {
    if (this.props.type === 'tram') {
      return TramPicture;
    }
    return BusPicture;
  }

  render() {
    return (
      <View style={stylemoje.container}>
        <Image source={this.getPicture()} style={{ width: 40, height: 40 }} />
        <Text style={stylemoje.text}>{this.props.display}</Text>
      </View>
    );
  }
}
const stylemoje = StyleSheet.create({
  text: {
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  container: {
    paddingVertical: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
