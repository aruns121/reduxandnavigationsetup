import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


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
    if(this.state.barCodeRead===true){
      if (
        data !== null &&
        data !== undefined &&
        data[0] === 'x' &&
        data[1] === 'y' &&
        data[2] === 'z'
      ) {
          let barcodedata = {
            name: data,
          }
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
        } 
        else {
          alert('Access Denied!');
          this.props.navigation.navigate('HomeScreen');
            // console.log(data);
        }
        this.setState({barCodeRead: false});
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           <Text>QR Scanning</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={this.changeCameraType}>
          <Text style={styles.text}>Switch Camera</Text>
        </TouchableOpacity>
      
        <RNCamera
            ref={this._RNCameraRef}
            type={this.state.cameraType}
            captureAudio={false}
            style={styles.RNCameraStyles}
            onBarCodeRead={this.barcodeRecognized}
            mirrorImage={this.state.mirrorMode}></RNCamera>
    
       
           <TouchableOpacity style={styles.Button}
              onPress={() => this.props.navigation.navigate('HomeScreen')}>  
              <Text style={styles.text}>Go Back To HomeScreen</Text>
          </TouchableOpacity>   
     
     
      </View>
    );
  }
}


const styles = StyleSheet.create({
  RNCameraStyles: {
    width: '70%',
    height: '40%',
  },
  Button: {
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:"#464B55",
    width:300,
    height:52,
    backgroundColor:'#047EE3',
    borderRadius: 10,
},

text: {
  color: 'white',
   fontSize:17
},

});
export default QrcodeScreen;
