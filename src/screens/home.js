import React,{Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}>
           <Text>Access Logging</Text>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={styles.Button}
              onPress={() => this.props.navigation.navigate('QrcodeScreen')} >
                <Text style={styles.text}>Scan OR</Text>
              </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
            <TouchableOpacity style={styles.Button}
              onPress={() => this.props.navigation.navigate('WalkinVisitorsScreen')}>  
               <Text style={styles.text}>Walk-in visitors</Text>
            </TouchableOpacity>   
        </View>
      </View>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  Button: {
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