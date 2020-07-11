/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default class ImageComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAuthor = () => {
    const {data} = this.props;
    const author = data.author;
    return (
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          marginTop: 10,
          marginBottom: 20,
          alignSelf: 'center',
        }}>
        {author}
      </Text>
    );
  };

  getUrl = () => {
    const {data, size} = this.props;
    const imageSize = size || 300;
    const url = data.download_url;
    const urlArray = url.split('id');
    const idAndDimentions = urlArray[1].split('/');
    const uri =
      urlArray[0] +
      'id' +
      '/' +
      idAndDimentions[1] +
      '/' +
      imageSize +
      '/' +
      imageSize;
    return uri;
  };

  renderImage = () => {
    const uri = this.getUrl();
    const {size} = this.props;
    const imageSize = size || 300;
    return (
      <Image
        source={{uri}}
        style={{height: imageSize, width: imageSize, borderRadius: 10}}
      />
    );
  };

  render() {
    return (
      <View>
        {this.renderImage()}
        {this.renderAuthor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
