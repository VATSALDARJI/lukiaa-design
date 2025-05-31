import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import EngagingScreen from '../screens/EngagingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomHeader from '../components/header/CustomHeader';
import ProfileScreenTwo from '../screens/ProfileScreenTwo';

export type MainStackParams = {
  ProfileScreen: undefined;
  ProfileScreenTwo: undefined;
  EngagingScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EngagingScreen"
        screenOptions={() => ({
          contentStyle: styles.commonContentStyle,
          headerShown: false,
        })}>
        <Stack.Screen name="EngagingScreen" component={EngagingScreen} />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name='ProfileScreenTwo'
          component={ProfileScreenTwo}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  commonContentStyle: {
    backgroundColor: colors.background,
  },
});
