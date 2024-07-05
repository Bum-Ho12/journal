import { store } from '@/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import RootLayoutNav from './rootLayoutNav';
import { loadCredentials } from '@/store/auth-slice';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';

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
      const resp = await SecureStore.getItemAsync('user')
      console.log('user',resp)
      if (loaded) {
        await store.dispatch(loadCredentials()).then((res) => {
          SplashScreen.hideAsync();
          const user = store.getState().auth.user;
          console.log('Credentials loaded', res, user);
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
      <RootLayoutNav />
    </Provider>
  );
}
