import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AccountVerifyScreen from '../screens/AccountVerifyScreen';
import EngagingScreen from '../screens/EngagingScreen';

export type AuthParams = {
  Login: undefined;
  Signup: undefined;
  AccountVerify: {
    userId: number;
  };
};

const Stack = createNativeStackNavigator<AuthParams>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          contentStyle: styles.commonContentStyle,
          headerShown: false,
        })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AccountVerify" component={AccountVerifyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  commonContentStyle: {
    backgroundColor: colors.background,
  },
});
