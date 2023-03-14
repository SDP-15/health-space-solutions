import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrivateRoute({ children }) {
  const [homeNav, welcomeNav, ...remaining] = children;
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoggedInNavigation = async () => {
    try {
      const retrieved = await AsyncStorage.getItem('loggedIn');
      setLoggedIn(retrieved === 'true');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedInNavigation();
  });
  return loggedIn ? homeNav : welcomeNav;
}
