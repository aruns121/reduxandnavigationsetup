import React,{Component} from 'react';
import { View, Text, Button, TextInput } from 'react-native';

class LoginScreen extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   <Text>Login</Text>
                </View>   
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <TextInput
                        style={{height:57,width:320,borderColor:'black',borderWidth:1}}
                        placeholder="Username">
                        </TextInput>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                        <TextInput
                        style={{height:57,width:320,borderColor:'black',borderWidth:1}}
                        placeholder="Password"
                        secureTextEntry>
                        </TextInput>
                </View>
                {/* <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <Text>{this.state.error}</Text>
                </View> */}
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                        <Button
                        title="Login"
                        onPress={() => this.props.navigation.navigate('HomeScreen')}
                        />
                </View>  
          </View>
        );
      }
    }

export default LoginScreen;