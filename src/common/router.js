import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import DetaisListScreen from '../screens/detailslist';
import WalkinVisitors from '../screens/walkinvisitors';
import QrcodeScreen from '../screens/qrcode';
import FullDetaisScreen from '../screens/fulldetails';

const MainNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    DetaisListScreen: {
      screen: DetaisListScreen,
    },
    QrcodeScreen: {
      screen: QrcodeScreen,
    },
    FullDetaisScreen: {
      screen: FullDetaisScreen,
    },
    WalkinVisitorsScreen: {
      screen: WalkinVisitors,
    },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);
const Router = createAppContainer(MainNavigator);
export default Router;
