import * as React from 'react';
import { Loading } from '../components';

interface WithLoadingProps {
  showLoadingIndicator: () => boolean;
}

const WithLoading: React.SFC<WithLoadingProps> = ({ children, showLoadingIndicator }): JSX.Element => (
  <React.Fragment>{showLoadingIndicator() ? <Loading /> : children}</React.Fragment>
);

export default WithLoading;
