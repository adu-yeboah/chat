import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigation from './navigation/mainNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainNavigation />
    </GestureHandlerRootView>
  );
}