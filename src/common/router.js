import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import WalkinVisitors from '../screens/walkinvisitors';
import QrcodeScreen from '../screens/qrcode';


const MainNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    QrcodeScreen: {
      screen: QrcodeScreen,
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
