import * as React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import { App } from './App';

const component = shallow(<App />);

describe('<App />', () => {
  it('Should render 1 <App /> component', () => {
    expect(component).toHaveLength(1);
  });

  // it('Should render without crashing', () => {
  //   const div = document.createElement('div');
  //   render(<App />, div);
  // });
});
