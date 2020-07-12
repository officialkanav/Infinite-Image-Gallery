import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';

const width = Dimensions.get('window').width;

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showImage: false,
      showLoader: false,
      author: '',
    };
  }

  renderLoader = () => {
    const {size} = this.props;
    const loaderSize = size || 300;
    return (
      <View
        style={[
          styles.loaderContainer,
          {height: loaderSize, width: loaderSize},
        ]}>
        <Spinner
          isVisible={true}
          size={100}
          type={'ThreeBounce'}
          color="black"
        />
      </View>
    );
  };

  getAuthor = async () => {
    const uri = 'https://picsum.photos/id/' + this.state.text + '/info';
    return fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        const {author} = json;
        if (author) {
          this.setState({author});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderAuthor = () => {
    const {author} = this.state;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: 10}}>
        <Text style={styles.authorText}>{author}</Text>
      </View>
    );
  };

  renderImage = () => {
    const uri = 'https://picsum.photos/id/' + this.state.text + '/300/300';
    const {showLoader} = this.state;
    return (
      <View>
        <FastImage
          source={{uri}}
          style={styles.image}
          onLoad={() => {
            this.setState({showLoader: false});
          }}
        />
        {showLoader && this.renderLoader()}
      </View>
    );
  };

  searchOnPress = () => {
    if (isNaN(this.state.text)) {
      // eslint-disable-next-line no-alert
      alert('Enter a valid number');
    } else {
      this.setState({showImage: true, showLoader: true, author: ''}, () => {
        this.getAuthor();
      });
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
        <View style={styles.flexRow}>
          {this.renderTextInput()}
          {this.renderSearchButton()}
        </View>
        {showImage && this.renderImage()}
        {showImage && this.renderAuthor()}
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
  loaderContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
    borderRadius: 10,
    marginTop: 50,
  },
  authorText: {
    fontSize: 22,
    color: 'black',
    marginTop: 5,
    alignSelf: 'center',
  },
  image: {height: 300, width: 300, borderRadius: 10, marginTop: 50},
  flexRow: {flexDirection: 'row'},
});
