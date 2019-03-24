import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getStops, closestStops } from '../utils/stops';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    myLatitude: 50.056455,
    myLongitude: 19.951687,
  };

  async componentDidMount() {
    const stops = await getStops();

    const { myLatitude, myLongitude } = this.state;
    const distanceStops = closestStops(stops, myLatitude, myLongitude);

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
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
