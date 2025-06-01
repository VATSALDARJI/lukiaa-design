import React, {ReactElement, ReactNode} from 'react';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {colors} from '../../constants/colors';

interface CustomToastWrapperProps {
  children: ReactElement | ReactElement[];
}

const CustomToastWrapper: React.FC<CustomToastWrapperProps> = ({children}) => {
  return (
    <AlertNotificationRoot
      theme="dark"
      colors={[
        {
          overlay: '#ffffff', // Overlay background color (light theme)
          success: '#20C997', // Success icon and primary color
          danger: '#FF6347', // Danger/Error color
          warning: colors.warning, // Warning color
          info: colors.gradientstartColor, // Info color
          card: colors.gradientstartColor, // Card background color
          label: colors.white, // Label text color
        },
        {
          overlay: '#ffffff', // Overlay background color (dark theme)
          success: '#20C997', // Success icon and primary color
          danger: '#FF6347', // Danger/Error color
          warning: colors.warning, // Warning color
          info: colors.gradientstartColor, // Info color
          card: colors.gradientstartColor, // Card background color
          label: colors.white, // Label text color
        },
      ]}>
      {children}
    </AlertNotificationRoot>
  );
};

export default CustomToastWrapper;
