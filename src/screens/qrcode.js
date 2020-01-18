import React,{Component} from 'react';
import { View, Text , StyleSheet , Image} from 'react-native';
import { RNCamera } from 'react-native-camera';

class QrcodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._RNCameraRef = React.createRef();
}

barcodeRecognized = ({ data }) => {
  console.log(data[43]);
  console.log(typeof(data));
      if(data !== null && data !== undefined && data[0]==='x'&& data[1]==='y'&& data[2]==='z'){
        alert("Access Granted!");
        this.props.navigation.navigate('DetaisListScreen');  
      }
      else{
        alert("Access Denined!");
        this.props.navigation.navigate('QrcodeScreen');
      }
};

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Text>QR Scanning</Text>
               <RNCamera
                   ref={this._RNCameraRef}
                   type={RNCamera.Constants.Type.back}
                   captureAudio={false}
                  //  notAuthorizedView={<PendingView />}
                   style={styles.RNCameraStyles}
                   onBarCodeRead={this.barcodeRecognized} >
                
               </RNCamera>
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
});