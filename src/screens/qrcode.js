import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

class QrcodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      mirrorMode: false,
    };
    this._RNCameraRef = React.createRef();
  }

  barcodeRecognized = ({data}) => {
    // console.log(data);
    // console.log(typeof(data));
    if (
      data !== null &&
      data !== undefined &&
      data[0] === 'x' &&
      data[1] === 'y' &&
      data[2] === 'z'
    ) {
      alert('Access Granted!');
      this.props.navigation.navigate('DetaisListScreen');
    } else {
      alert('Access Denined!');
      this.props.navigation.navigate('QrcodeScreen');
    }
  };

  changeCameraType = () => {
    if (this.state.cameraType === RNCamera.Constants.Type.back) {
      this.setState({
        cameraType: RNCamera.Constants.Type.front,
        mirrorMode: true,
      });
    } else {
      this.setState({
        cameraType: RNCamera.Constants.Type.back,
        mirrorMode: false,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, padding: '10%'}}>
        <TouchableOpacity style={styles.Button} onPress={this.changeCameraType}>
          <Text style={styles.text}>Switch Camera</Text>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>QR Scanning</Text>
          <RNCamera
            ref={this._RNCameraRef}
            type={this.state.cameraType}
            captureAudio={false}
            style={styles.RNCameraStyles}
            onBarCodeRead={this.barcodeRecognized}
            mirrorImage={this.state.mirrorMode}></RNCamera>
        </View>
      </View>
    );
  }
}

export default QrcodeScreen;
const styles = StyleSheet.create({
  RNCameraStyles: {
    width: '70%',
    height: '40%',
  },
  Button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#464B55',
    width: 200,
    height: 40,
    backgroundColor: '#047EE3',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 17,
  },
});
