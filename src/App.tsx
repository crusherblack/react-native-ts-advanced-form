import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Navigation from 'src/navigations';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </PaperProvider>
  );
}

export default App;
