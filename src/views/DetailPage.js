/* eslint-disable no-alert */
import React from 'react';
import {StyleSheet, View, Modal, Button, Clipboard} from 'react-native';
import ImageComponent from './Image';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-spinkit';
import {request_storage_runtime_permission} from '../utils/helpers';

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      saving: false,
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await request_storage_runtime_permission();
    }
  }

  renderLoader = () => {
    return (
      <Spinner isVisible={true} size={60} type={'ThreeBounce'} color="black" />
    );
  };

  getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : 'jpg';
  };

  downloadImage = () => {
    var date = new Date();
    const image_URL = this.getLink();
    const ext = '.jpg';
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    this.setState({saving: true});
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        this.setState({saving: false});
      })
      .catch((err) => {
        alert(err.message);
        this.setState({saving: false});
      });
  };

  getLink = () => {
    const {data} = this.props;
    const imageSize = 350;
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

  copyToClipboard = () => {
    const uri = this.getLink();
    Clipboard.setString(uri);
    alert('Link copied to clipboard');
  };

  renderHeader = () => {
    const {close} = this.props;
    const {saving} = this.state;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.flexRow}>
          <Button color="black" title="Close" onPress={close} />
          <View style={styles.buttonMargin}>
            <Button title="Copy Link" onPress={this.copyToClipboard} />
          </View>
          <View style={styles.buttonMargin}>
            <Button title="Download" onPress={this.downloadImage} />
          </View>
        </View>
        {saving && this.renderLoader()}
      </View>
    );
  };

  renderImage = () => {
    const {data} = this.props;
    return (
      <View style={styles.justifyCenter}>
        <ImageComponent data={data} size={350} />
      </View>
    );
  };

  render() {
    const {modalVisible, data} = this.props;
    if (data === null) {
      return <View />;
    }
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderImage()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  flexRow: {
    flexDirection: 'row',
  },
  buttonMargin: {marginLeft: 10},
  justifyCenter: {justifyContent: 'center'},
});
