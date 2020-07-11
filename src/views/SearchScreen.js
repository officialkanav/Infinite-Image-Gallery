/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const width = Dimensions.get('window').width;

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showImage: false,
      showLoader: false,
    };
  }

  renderImage = () => {
    const uri = 'https://picsum.photos/id/' + this.state.text + '/300/300';
    return (
      <Image
        source={{uri}}
        style={{height: 300, width: 300, borderRadius: 10, marginTop: 50}}
        onLoad={null}
      />
    );
  };

  searchOnPress = () => {
    if (isNaN(this.state.text)) {
      // eslint-disable-next-line no-alert
      alert('Enter a valid number');
    } else {
      this.setState({showImage: true});
    }
  };

  renderSearchButton = () => {
    return (
      <TouchableOpacity
        onPress={this.searchOnPress}
        style={styles.buttonContainer}>
        <Text style={styles.text}> Search </Text>
      </TouchableOpacity>
    );
  };

  renderTextInput = () => {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            this.setState({text: value, showImage: false, showLoader: false});
          }}
          value={this.state.text}
          placeholder={'Enter Id'}
        />
      </KeyboardAvoidingView>
    );
  };

  render() {
    const {showImage} = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {this.renderTextInput()}
          {this.renderSearchButton()}
        </View>
        {showImage && this.renderImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: width / 2,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    color: 'black',
    fontWeight: '700',
    backgroundColor: 'darkgray',
  },
  textInputContainer: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    width: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
});
