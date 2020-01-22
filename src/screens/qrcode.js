import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loader from '../component/Loader';

class QrcodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false,
      barCodeRead: true,

      cameraType: RNCamera.Constants.Type.back,
      mirrorMode: false,
    };
    this._RNCameraRef = React.createRef();
    let userId = auth().currentUser.uid && auth().currentUser.uid;
    this.ref = firebase.database().ref(`/barcode/${userId}`);
  }

  barcodeRecognized = ({data}) => {
    // console.log(data);
    // console.log(typeof(data));
    const universal = new Date();
    const date = universal.toString();
    if ((this.state.barCodeRead === true, this.state.isLoading === false)) {
      if (
        data !== null &&
        data !== undefined &&
        data[0] === 'x' &&
        data[1] === 'y' &&
        data[2] === 'z'
      ) {
        let barcodedata = {
          name: data,
          date: date,
        };
        this.setState({isLoading: true});
        this.ref
          .push(barcodedata)
          .then(() => {
            // alert('success');
            this.setState({isLoading: false, name: ''});
            // console.log(data);
          })
          .catch(error => {
            this.setState({isLoading: false});

            alert(error.message);
          });

        alert('Access Granted!');
        this.props.navigation.navigate('HomeScreen');
      } else {
        alert('Access Denied!');
        this.props.navigation.navigate('HomeScreen');
        // console.log(data);
      }
      this.setState({barCodeRead: false, isLoading: true});
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
    const {isLoading} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Loader loading={isLoading} />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', paddingLeft: 20}}>
              <TouchableOpacity
                style={styles.BackButton}
                onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>QR Scanning</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={this.changeCameraType}>
                  <Text style={styles.text}>Switch Camera</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 400,
                  height: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <RNCamera
                  ref={this._RNCameraRef}
                  type={this.state.cameraType}
                  captureAudio={false}
                  style={styles.RNCameraStyles}
                  onBarCodeRead={this.barcodeRecognized}
                  mirrorImage={this.state.mirrorMode}>
                  <Image
                    style={{width: 100, height: 100}}
                    resizeMode="stretch"
                    source={require('../../assets/images/qr.jpg')}
                  />
                </RNCamera>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  RNCameraStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
  },
  Button: {
    // alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#464B55',
    width: 150,
    height: 50,
    backgroundColor: '#047EE3',
    borderRadius: 10,
  },

  BackButton: {
    // alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#464B55',
    width: 100,
    height: 35,
    backgroundColor: '#047EE3',
    borderRadius: 8,
  },

  text: {
    color: 'white',
    fontSize: 17,
  },

  text: {
    color: 'white',
    fontSize: 17,
  },
});
export default QrcodeScreen;
