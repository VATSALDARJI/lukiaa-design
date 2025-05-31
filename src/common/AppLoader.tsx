import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {colors} from '../constants/colors'; // Adjust path if needed

// Define the type of functions exposed via ref
export interface LoaderType {
  start: () => void;
  stop: () => void;
}

interface CustomLoaderProps {
  backgroundColor?: string;
  loaderColor?: string;
  size?: number;
  overlayStyle?: ViewStyle;
}

const AppLoader = forwardRef<LoaderType, CustomLoaderProps>(
  (
    {
      backgroundColor = 'rgba(0, 0, 0, 0.3)',
      loaderColor = colors.gradientstartColor,
      size = 70,
      overlayStyle,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState<boolean>(false);

    // Expose start/stop functions via ref
    useImperativeHandle(
      ref,
      () => ({
        start: () => setVisible(true),
        stop: () => setVisible(false),
      }),
      [],
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent>
        <View
          style={[
            styles.overlay,
            {backgroundColor: backgroundColor},
            overlayStyle,
          ]}>
          {/* <ActivityIndicator size="large" color={loaderColor} /> */}
          <LoaderKit
            style={{width: size, height: size}}
            name="BallPulse"
            color={loaderColor}
          />
        </View>
      </Modal>
    );
  },
);

export default AppLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
