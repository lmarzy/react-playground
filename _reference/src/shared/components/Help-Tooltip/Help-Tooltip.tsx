import * as React from 'react';
import * as styles from './styles.scss';

import { Icon, Alert } from '..';

interface HelpTooltipProps {
  children: React.ReactNode;
}

const initialState = {
  showHelpTooltip: false,
};

type HelpTooltipState = Readonly<typeof initialState>;

const onShowTooltip = (prevState: HelpTooltipState): HelpTooltipState => {
  const newState = { ...prevState };
  newState.showHelpTooltip = !prevState.showHelpTooltip;
  return newState;
};

export class HelpTooltip extends React.Component<HelpTooltipProps, HelpTooltipState> {
  readonly state: HelpTooltipState = initialState;

  handleShowTooltip = () => this.setState(onShowTooltip(this.state));

  render() {
    const { children } = this.props;
    const { showHelpTooltip } = this.state;

    let helpBtnStyles = styles.helpBtn;
    if (this.state.showHelpTooltip) helpBtnStyles += ` ${styles.active}`;

    return (
      <div className={styles.helpTooltip}>
        <button type="button" className={helpBtnStyles} onClick={this.handleShowTooltip}>
          <span className="u-hidden-visually">Show help information</span>
          <Icon name="help" />
        </button>
        {showHelpTooltip && (
          <div className={styles.alert}>
            <Alert arrow="right">{children}</Alert>
          </div>
        )}
      </div>
    );
  }
}
