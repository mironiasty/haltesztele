import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  };

  state = {
    stops: []
  };

  async componentDidMount() {
    const stopsRequest = await fetch("https://krakowpodreka.pl/en/stops/positions/stops/");
    const stops = await stopsRequest.json();
    this.setState({ stops });
  }

  renderItem({ item }) {
    return <Text>{item.name}</Text>;
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
    backgroundColor: "#fff"
  }
});
