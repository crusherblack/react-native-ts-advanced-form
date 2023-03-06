import React, {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';

import {Text as PaperText, TextProps} from 'react-native-paper';

type TProps = PropsWithChildren<{
  style?: ViewStyle;
}> &
  TextProps;

const Text: React.FC<TProps> = ({children, style}) => {
  return <PaperText style={style}>{children}</PaperText>;
};

export default Text;
