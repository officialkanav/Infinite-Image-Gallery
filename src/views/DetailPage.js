/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Modal, Button} from 'react-native';
import ImageComponent from './Image';

export default class SearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  renderHeader = () => {
    const {close} = this.props;
    return (
      <View
        style={{
          position: 'absolute',
          top: 70,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'gray',
        }}>
        <Button color="black" title="Close" onPress={close} />
        <Button color="black" title="Copy Link" onPress={null} />
        <Button color="black" title="Download" onPress={null} />
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
            backgroundColor: 'gray',
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
