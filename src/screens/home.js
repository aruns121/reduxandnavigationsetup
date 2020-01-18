import React,{Component} from 'react';
import { View, Text,Button} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           <Text>Access Logging</Text>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Button
              title="Scan OR"
              onPress={() => this.props.navigation.navigate('QrcodeScreen')}
            />
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
            <Button
              title="Walk-in visitors"
              onPress={() => this.props.navigation.navigate('WalkinVisitorsScreen')}
            />   
        </View>
      </View>
    );
  }
}

export default HomeScreen;