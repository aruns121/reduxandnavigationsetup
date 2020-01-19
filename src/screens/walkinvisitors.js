import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Loader from '../component/Loader';

class WalkinVisitorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      phoneNo: '',
      idNo: '',
      errors: {},
      isLoading: false,
    };
    let userId = auth().currentUser.uid && auth().currentUser.uid;
    console.log('auth().currentUser.uid', auth().currentUser.uid);
    this.ref = firebase.database().ref(`/users/${userId}`);
  }

  changeTextinputContent = (item, val) => {
    this.setState({
      [item]: val,
    });
  };

  addUser = () => {
    const {name, phoneNo, idNo} = this.state;
    if (this.isValid()) {
      let data = {
        //     name: 'test',
        //     phoneNo: '987456123',
        //     id: 'avc1245e',

        name: name,
        phoneNo: phoneNo,
        id: idNo,
      };

      this.setState({isLoading: true});
      this.ref
        .push(data)
        .then(() => {
          // alert('success');
          this.onSuccess();
        })
        .catch(error => {
          this.setState({isLoading: false});

          alert(error.message);
        });
    }
  };

  onSuccess = () => {
    this.setState({isLoading: false, name: '', phoneNo: '', idNo: ''});
    alert('New user Added');
  };

  isValid = () => {
    let valid = true;
    const {name, phoneNo, idNo} = this.state;
    let errors = {};
    if (
      (name === '' || name.length === 0) &&
      (phoneNo === '' || phoneNo.length === 0) &&
      (idNo === '' || idNo.length === 0)
    ) {
      valid = false;
      errors.name = 'Name cannot be empty';
      errors.phoneNo = 'Phone Number cannot be empty';
      errors.idNo = 'Id number cannot be empty';
    } else {
      if (name === '' || name.length === 0) {
        valid = false;
        errors.name = 'Name cannot be empty';
      }
      if (phoneNo === '' || phoneNo.length === 0) {
        valid = false;
        errors.phoneNo = 'Phone Number cannot be empty';
      }
      if (idNo === '' || idNo.length === 0) {
        valid = false;
        errors.idNo = 'Id number cannot be empty';
      }
      //     TODO: ADD validations for name minimum length, phone number, ID number
    }
    this.setState({errors});
    return valid;
  };

  render() {
    const {errors, isLoading, name, phoneNo, idNo} = this.state;
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
                <Text>walkin visitors</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <TextInput
                  value={name}
                  style={{
                    height: 57,
                    width: 320,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Name"
                  onChangeText={text =>
                    this.changeTextinputContent('name', text)
                  }
                />
                {errors.name ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.name}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  value={phoneNo}
                  style={{
                    height: 57,
                    width: 320,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  keyboardType="phone-pad"
                  placeholder="Phone"
                  onChangeText={text =>
                    this.changeTextinputContent('phoneNo', text)
                  }
                />
                {errors.phoneNo ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.phoneNo}
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
                  value={idNo}
                  style={{
                    height: 57,
                    width: 320,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="ID No"
                  onChangeText={text =>
                    this.changeTextinputContent('idNo', text)
                  }
                />
                {errors.idNo ? (
                  <Text style={{color: 'red', paddingTop: 5}}>
                    {errors.idNo}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Button
                  title="Log"
                  //     onPress={() => this.props.navigation.navigate('DetaisListScreen')}
                  onPress={() => this.addUser()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default WalkinVisitorsScreen;
