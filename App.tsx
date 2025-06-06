import React from 'react';
import {StyleSheet} from 'react-native';
import RootScreen from './src/navigation/RootScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <RootScreen />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
