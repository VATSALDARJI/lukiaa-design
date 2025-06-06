import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import EngagingScreen from '../screens/EngagingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomHeader from '../components/header/CustomHeader';
import ProfileScreenTwo from '../screens/ProfileScreenTwo';
import ProgressIndicator from '../components/header/CustomHeader';
import BottomTabNavigator from './BottomStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import OccasionScreen from '../screens/OccasionScreen';
import OutfitDetailScreen from '../screens/OutfitDetailScreen';
import StackHeader from '../components/nav/StackHeader';
import {CustomImages} from '../assets/images';

export type MainStackParams = {
  ProfileScreen: undefined;
  ProfileScreenTwo: {
    height: number;
    gender: string;
    age: string;
    bodyShape: string[];
    bodyType: string[];
  };
  EngagingScreen: undefined;
  BottomTab: undefined;
  OccasionScreen: undefined;
  OutfitDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

export const MainStack = () => {
  const {isProfileSetup} = useSelector((state: RootState) => state.userProfile);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isProfileSetup ? 'BottomTab' : 'EngagingScreen'}
        screenOptions={() => ({
          contentStyle: styles.commonContentStyle,
          headerShown: false,
          // statusBarStyle:colors.white
        })}>
        <Stack.Screen name="EngagingScreen" component={EngagingScreen} />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={
            {
              // header: () => <ProgressIndicator isPageOneComplete={false} />,
              // headerShown: true,
            }
          }
        />
        <Stack.Screen
          name="ProfileScreenTwo"
          component={ProfileScreenTwo}
          options={
            {
              // header: () => <ProgressIndicator isPageOneComplete={false} />,
              // headerShown: true,
            }
          }
        />
        <Stack.Screen
          name="OccasionScreen"
          component={OccasionScreen}
          options={{
            headerShown: true,
            header: () => (
              <StackHeader
                subtitle="Tell us about your preferences & get personalized recommendations"
                title="Style Your Perfect Look"
                // rightIcon={CustomImages.bag}
              />
            ),
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OutfitDetailScreen"
          component={OutfitDetailScreen}
          options={{
            headerShown: true,
            header: () => (
              <StackHeader
                subtitle="Ai curated just for you"
                title="Your Perfect Outfit"
                rightIcon={CustomImages.bag}
              />
            ),
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
