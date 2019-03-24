import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Location, Permissions } from 'expo';
import { getStops, closestStops } from '../utils/stops';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    myLatitude: 50.056455,
    myLongitude: 19.951687,
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  async componentDidMount() {
    const stops = await getStops();

    const { myLatitude, myLongitude } = this.state;
    const distanceStops = closestStops(stops, myLatitude, myLongitude);

    this.setState({ distanceStops });
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      myLatitude: location.coords.latitude,
      myLongitude: location.coords.longitude,
    });
  };

  renderItem({ item }) {
    return <Text>{item.display}</Text>;
  }

  render() {
    const { distanceStops } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={distanceStops}
          keyExtractor={item => `${item.id}`}
          renderItem={this.renderItem}
        />
      </View>
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
