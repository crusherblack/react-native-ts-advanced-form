import React, {PropsWithChildren} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import {Surface} from 'react-native-paper';

type TProps = PropsWithChildren<{
  title: string;
  style: ViewStyle;
}>;

const MyComponent: React.FC<TProps> = ({children, style}) => (
  <Surface style={{...styles.surface, ...style}} elevation={4}>
    {children}
  </Surface>
);

export default MyComponent;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
