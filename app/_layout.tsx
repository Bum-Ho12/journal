import { store } from '@/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import RootLayoutNav from './rootLayoutNav';
import { loadCredentials } from '@/store/auth-slice';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const loadAccount =async()=>{
      if (loaded) {
        await store.dispatch(loadCredentials()).then((res) => {
          SplashScreen.hideAsync();
        });
      }
    }
    loadAccount()
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style='dark'/>
      <RootLayoutNav />
    </Provider>
  );
}
