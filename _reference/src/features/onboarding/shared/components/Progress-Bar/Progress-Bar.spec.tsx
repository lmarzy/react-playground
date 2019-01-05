import * as React from 'react';
import { shallow } from 'enzyme';
import * as style from './styles.scss';

import { ProgressBar } from './Progress-Bar.component';

const status = {
  aboutYou: 'complete',
  yourBudget: 'active',
  breathingSpace: 'inActive',
};

const component = shallow(<ProgressBar status={status} />);

describe('<ProgressBar />', () => {
  it('should render a "ol"', () => {
    expect(component.find('ol').length).toEqual(1);
  });
  it('should render 3 "li"', () => {
    expect(component.find('li').length).toEqual(3);
  });
});
