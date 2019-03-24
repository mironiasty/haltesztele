import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getStops } from '../utils/stops';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  state = {
    stops: [],
  };

  async componentDidMount() {
    const stops = await getStops();
    this.setState({ stops });
  }

  renderItem({ item }) {
    return <Text>{item.display}</Text>;
  }

  render() {
    const { stops } = this.state;
    return (
      <FlatList
        style={styles.container}
        data={stops}
        keyExtractor={item => `${item.id}`}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
