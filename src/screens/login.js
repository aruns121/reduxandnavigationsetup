import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import Loader from '../component/Loader';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    };
  }

  changeTextinputContent = (item, val) => {
    this.setState({
      [item]: val,
    });
  };

  authenticate = () => {
    const {email, password} = this.state;
    // let email = 'tester@test.cc',
    // password = '123456';
    if (this.isValid()) {
      this.setState({isLoading: true});
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim().toLowerCase(), password.trim())
        .then(this.onLoginSuccess)
        .catch(error => {
          this.setState({isLoading: false});
          alert(error.message);
        });
    }
  };

  onLoginSuccess = () => {
    // alert('success');
    this.setState({isLoading: false, email: '', password: ''});
    this.props.navigation.navigate('HomeScreen');
  };

  isValid = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid = true;
    let errors = {};
    const {email, password} = this.state;
    if (
      (email === '' || email.length === 0) &&
      (password === '' || password.length === 0)
    ) {
      errors.email = 'Email cannot be empty';
      errors.password = 'Password cannot be empty';
      valid = false;
    } else {
      if (email === '' || email.length === 0) {
        errors.email = 'Email cannot be empty';
        valid = false;
      }

      if (password === '' || password.length === 0) {
        errors.password = 'Password cannot be empty';
        valid = false;
      }
      if (!regex.test(email) && email.length > 0) {
        errors.email = 'Please enter a valid email';
        valid = false;
      }
      if (password.length < 6 && password.length > 1) {
        errors.password = 'Password should contain atleast 6 characters';
        valid = false;
      }
    }
    this.setState({errors});
    return valid;
  };

  render() {
    const {email, password, errors, isLoading} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? 25 : 0,
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <Loader loading={isLoading} />
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Login</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  value={email}
                  onChangeText={text =>
                    this.changeTextinputContent('email', text)
                  }
                  style={{
                    height: 57,
                    width: 320,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Username"
                />
                {errors.email ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TextInput
                  value={password}
                  onChangeText={text =>
                    this.changeTextinputContent('password', text)
                  }
                  style={{
                    height: 57,
                    width: 320,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Password"
                  secureTextEntry
                />
                {errors.password ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              {/* <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                <Text>{this.state.error}</Text>
                </View> */}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Button
                  title="Login"
                  onPress={this.authenticate}
                  // onPress={() => this.props.navigation.navigate('HomeScreen')}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
