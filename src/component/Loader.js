import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

const Loader = props => (
  <Modal
    transparent={true}
    animationType={'none'}
    visible={props.loading}
    onRequestClose={() => {
      return null;
    }}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={props.loading} />
      </View>
    </View>
  </Modal>
);

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
