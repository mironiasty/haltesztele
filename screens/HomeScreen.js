import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import { Location, Permissions } from 'expo';
import { getStops, closestStops } from '../utils/stops';
import Przystanek from '../components/Przystanek';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Najbliższe przystanki',
  };

  state = {};

  async componentDidMount() {
    const stops = await getStops();
    const coordinate = await this._getLocationAsync();

    const { myLatitude, myLongitude } = coordinate;
    // const myLatitude = coordinate.myLatitude;
    // const myLongitude = coordinate.myLongitude; to jest to samo co wyżej
    const distanceStops = closestStops(stops, myLatitude, myLongitude);

    this.setState({ distanceStops });
  }

  async _getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      myLatitude: location.coords.latitude,
      myLongitude: location.coords.longitude,
    };
  }

  renderItem({ item }) {
    return <Przystanek display={item.display} />;
  }

  render() {
    const { distanceStops } = this.state;
    if (!distanceStops) {
      return (
        <View style={styles.indicator}>
          <PacmanIndicator size={160} color={Colors.tabIconDefault} />
        </View>
      );
    }
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
  },
  indicator: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
