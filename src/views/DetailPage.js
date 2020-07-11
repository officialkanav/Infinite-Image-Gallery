/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Modal, Button, Clipboard, Alert} from 'react-native';
import ImageComponent from './Image';
import CameraRoll from '@react-native-community/cameraroll';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-spinkit';

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      saving: false,
    };
  }

  renderLoader = () => {
    return (
      <Spinner isVisible={true} size={60} type={'ThreeBounce'} color="black" />
    );
  };

  getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  };

  handleDownload = async () => {
    if (Platform.OS === 'android') {
      const granted = await this.getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    const url = this.copyToClipboard();
    this.setState({saving: true});
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', url)
      .then((res) => {
        CameraRoll.saveToCameraRoll(res.data, 'photo')
          .then(() => {
            Alert.alert(
              'Save remote Image',
              'Image Saved Successfully',
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
            );
          })
          .catch((err) => {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => {}}],
              {cancelable: false},
            );
          })
          .finally(() => this.setState({saving: false}));
      })
      .catch((error) => {
        this.setState({saving: false});
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      });
  };

  copyToClipboard = () => {
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
    Clipboard.setString(uri);
    return url;
  };

  renderHeader = () => {
    const {close} = this.props;
    const {saving} = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          top: 70,
          alignItems: 'center',
          backgroundColor: 'lightgray',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button color="black" title="Close" onPress={close} />
          <Button
            color="black"
            title="Copy Link"
            onPress={this.copyToClipboard}
          />
          <Button
            color="black"
            title="Download"
            onPress={this.handleDownload}
          />
        </View>
        {saving && this.renderLoader()}
      </View>
    );
  };

  renderImage = () => {
    const {data} = this.props;
    return (
      <View style={{justifyContent: 'center'}}>
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
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {this.renderHeader()}
          {this.renderImage()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
