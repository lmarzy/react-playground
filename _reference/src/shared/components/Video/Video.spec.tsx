import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { Video } from './Video.component';

const component = mount(
  <Video
    id={1}
    onVideoStarted={jest.fn}
    onVideoWatched={jest.fn}
    onWatchLater={jest.fn}
    onWatchNow={jest.fn}
    continueText="Let's get started"
  />,
);

describe('<Video />', () => {
  it('should render a "video"', () => {
    expect(component.find('video').length).toEqual(1);
  });
  it('should render a "Button" element that contains an image', () => {
    const buttonImage = component.find('button').at(0);
    expect(buttonImage.html()).toContain('span');
    expect(buttonImage.html()).toContain('img');
  });
});

describe('Initial State', () => {
  it('video should not be playing', () => {
    // @ts-ignore
    expect(component.state().videoIsPlaying).toEqual(false);
  });
  it('video should play when the button video image is clicked', () => {
    const btnImage = component.find('button').at(1);

    // @ts-ignore
    window.HTMLMediaElement.prototype.play = () => {
      /* do nothing */
    };

    btnImage.simulate('click');
    // @ts-ignore
    expect(component.state().videoIsPlaying).toEqual(true);
    component.unmount();
  });
});
