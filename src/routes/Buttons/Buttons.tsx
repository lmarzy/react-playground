import * as React from 'react';
import { Button } from '../../views';

export const initialState = {
  title: 'Buttons',
};

export type ButtonsState = Readonly<typeof initialState>;

export class Buttons extends React.Component<{}, ButtonsState> {
  readonly state: ButtonsState = initialState;

  handleButtonClick = (): void => {
    console.log('yay');
  };

  render() {
    const { title } = this.state;

    return (
      <section className="home">
        <h2>{title}</h2>

        <div className="u-mb-2">
          <Button type="button" style="primary">
            Button Primary
          </Button>
        </div>
        <div className="u-mb-2">
          <Button type="button" style="secondary">
            Button Secondary
          </Button>
        </div>
        <div className="u-mb-2">
          <Button type="button" style="primary" fullWidth onClick={this.handleButtonClick}>
            Button Full Width
          </Button>
        </div>
      </section>
    );
  }
}
