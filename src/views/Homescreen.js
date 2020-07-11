import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class Homescreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  navigate = (screenName) => {
    this.props.navigation.navigate(screenName);
    return;
  };

  renderButton = (text, screenName) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.navigate(screenName);
        }}
        style={styles.buttonContainer}>
        <Text style={styles.text}> {text} </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          {this.renderButton('Infinite List', 'infinite')}
          {this.renderButton('Search Screen', 'search')}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    width: 200,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  circle: {
    borderWidth: 2,
    borderRadius: 150,
    borderColor: 'black',
    padding: 60,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 22,
    color: 'black',
  },
});
