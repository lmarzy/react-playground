import * as React from 'react';

export const initialState = {
  title: 'Home',
};

export type HomeState = Readonly<typeof initialState>;

export class Home extends React.Component<{}, HomeState> {
  readonly state: HomeState = initialState;

  render() {
    const { title } = this.state;

    return (
      <section className="home">
        <h2>{title}</h2>
      </section>
    );
  }
}
