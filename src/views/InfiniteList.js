/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getImages} from '../actions/infinite';
import Spinner from 'react-native-spinkit';
import ImageComponent from '../views/Image';
import DetailPage from './DetailPage';

class InfiniteList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images || [],
      loading: false,
      showModal: false,
      modalData: null,
    };
    if (this.state.images.length === 0) {
      this.fetchImages();
    }
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (prevProps.loading !== this.props.loading) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({loading: this.props.loading});
      }
      if (prevProps.images !== this.props.images) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({images: this.props.images});
      }
    }
  }

  renderLoader = () => {
    return (
      <Spinner isVisible={true} size={100} type={'ThreeBounce'} color="black" />
    );
  };

  fetchImages = () => {
    const {getImages, page} = this.props;
    getImages(page + 1);
  };

  closeModal = () => {
    this.setState({showModal: false, modalData: null});
  };

  imageOnPress = (data) => {
    this.modalData = data;
    this.setState({showModal: true, modalData: data});
  };

  renderImages = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.imageOnPress(item);
        }}>
        <ImageComponent data={item} />
      </TouchableOpacity>
    );
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.fetchImages();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderFlatList = () => {
    const {loading} = this.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.images}
          renderItem={({item}) => {
            return this.renderImages(item);
          }}
          onEndReached={this.onEndReached}
          style={{flex: 0.95}}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
        <View
          style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
          {loading && this.renderLoader()}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderFlatList()}
        <DetailPage
          modalVisible={this.state.showModal}
          data={this.modalData}
          close={this.closeModal}
        />
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
});

const mapStateToProps = (state) => {
  return {
    ...state.Infinite,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getImages: (page) => {
      return dispatch(getImages(page));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteList);
