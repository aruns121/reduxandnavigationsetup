import React,{Component} from 'react';
import { View, Text, TextInput, Button } from 'react-native';


class WalkinVisitorsScreen extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text>walkin visitors</Text>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                        <TextInput
                        style={{height:57,width:320,borderColor:'black',borderWidth:1}}
                        placeholder="Name">
                        </TextInput>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <TextInput
                        style={{height:57,width:320,borderColor:'black',borderWidth:1}}
                        placeholder="Phone">
                        </TextInput>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                        <TextInput
                        style={{height:57,width:320,borderColor:'black',borderWidth:1}}
                        placeholder="ID No">
                        </TextInput>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                        <Button
                        title="Log"
                        onPress={() => this.props.navigation.navigate('DetaisListScreen')}
                        />
                </View>  
          </View>
        );
      }
    }



export default WalkinVisitorsScreen;