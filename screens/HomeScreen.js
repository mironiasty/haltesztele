import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

function distance(myLat, myLong, stopLat, stopLong) {
  const lat = myLat - stopLat;
  const long = myLong - stopLong;
  return Math.sqrt(lat * lat + long * long);
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    myLatitude: 50.056455,
    myLongitude: 19.951687
  };

  async componentDidMount() {
    const stopsRequest = await fetch("https://krakowpodreka.pl/en/stops/positions/stops/");
    const stops = await stopsRequest.json();

    const { myLatitude, myLongitude } = this.state;
    const distanceStops = stops
      .map(({ latitude, longitude, id, display }) => ({
        id: id,
        display: display,
        distance: distance(myLatitude, myLongitude, latitude, longitude)
      }))
      .sort((dist1, dist2) => dist1.distance - dist2.distance)
      .slice(0, 5);
    this.setState({ distanceStops });
  }

  renderItem({ item }) {
    return <Text>{item.display}</Text>;
  }

  render() {
    const { distanceStops } = this.state;
    return (
      <FlatList
        style={styles.container}
        data={distanceStops}
        keyExtractor={item => `${item.id}`}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  }
});
