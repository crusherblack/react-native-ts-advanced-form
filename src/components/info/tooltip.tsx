import React, {PropsWithChildren} from 'react';
import {Tooltip} from 'react-native-paper';

type TProps = PropsWithChildren<{
  title: string;
}>;

const MyComponent: React.FC<TProps> = ({title, children}) => (
  <Tooltip title={title}>
    <>{children}</>
  </Tooltip>
);

export default MyComponent;
