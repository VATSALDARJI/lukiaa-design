import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AuthParams} from '../navigation/AuthStack';
import {MainStackParams} from '../navigation/MainStack';
import {BottomTabParams} from '../navigation/BottomStack';

export type ScreenParams = AuthParams & MainStackParams & BottomTabParams; // Combine the params

export type ScreenProps<T extends keyof ScreenParams> = {
  navigation: NavigationProp<ScreenParams, T>;
  route: RouteProp<ScreenParams, T>;
};
