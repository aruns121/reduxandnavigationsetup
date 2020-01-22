import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import Loader from '../component/Loader';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '@test.com',
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
    const {password} = this.state;
    let {email} = this.state;
    email.includes('@test.com')
      ? null
      : (email = this.state.email + '@test.com');
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
    this.setState({isLoading: false, email: '@test.com', password: ''});
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
      if (!regex.test(email) && email.length < 2) {
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
        style={{flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <Loader loading={isLoading} />
            <View style={styles.container}>
              <View style={styles.container1}>
                <View style={styles.TextInput}>
                  <Image
                    style={styles.image}
                    resizeMode="stretch"
                    source={require('../../assets/images/users.jpg')}
                  />
                  <TextInput
                    style={{flex: 1, paddingLeft: 20}}
                    onChangeText={text =>
                      this.changeTextinputContent('email', text)
                    }
                    value={email}
                    placeholder="Username"
                  />
                </View>
                {errors.email ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>

              <View style={styles.container2}>
                <View style={styles.TextInput}>
                  <Image
                    style={styles.image}
                    resizeMode="stretch"
                    source={require('../../assets/images/lock.jpg')}
                  />
                  <TextInput
                    style={{flex: 1, paddingLeft: 20}}
                    onChangeText={text =>
                      this.changeTextinputContent('password', text)
                    }
                    value={password}
                    placeholder="Password"
                    secureTextEntry
                  />
                </View>
                {errors.password ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              <View style={styles.container3}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={this.authenticate}>
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },

  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#464B55',
    width: 320,
    height: 52,
    backgroundColor: '#047EE3',
    borderRadius: 10,
  },

  text: {
    color: 'white',
    fontSize: 17,
  },

  TextInput: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    width: 320,
    borderColor: '#464B55',
    borderWidth: 1,
    borderRadius: 10,
  },

  image: {
    width: 30,
    height: 30,
  },
});
