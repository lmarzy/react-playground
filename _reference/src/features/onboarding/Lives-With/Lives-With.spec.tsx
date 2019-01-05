import {
  initialState,
  LivesWithComponentState,
  onDecrementPersonLivesWith,
  onIncrementPersonLivesWith,
  onPartnerCheckedChange,
  setStateFromProps,
  LivesWithComponentProps,
} from './Lives-With';
import { Any } from '../../../shared/testing/any';

describe('Lives With Component', () => {
  let originalComponentState: LivesWithComponentState;

  beforeEach(() => {
    originalComponentState = { ...initialState };
  });

  describe('State changes', () => {
    it('decrement number of people who live with', () => {
      const stateStub = { ...originalComponentState };
      stateStub.children = 3;
      const result = onDecrementPersonLivesWith(stateStub, 'children');
      const expected = stateStub.children - 1;
      expect(result.children).toBe(expected);
    });

    it('increment number of people who live with', () => {
      const stateStub = { ...originalComponentState };
      stateStub.children = 3;
      const result = onIncrementPersonLivesWith(stateStub, 'children');
      const expected = stateStub.children + 1;
      expect(result.children).toBe(expected);
    });

    it('toggle partner selected', () => {
      const result = onPartnerCheckedChange(originalComponentState);
      expect(result.partner).toBe(!originalComponentState.partner);
    });

    it('maps new prop values', () => {
      const newProps: LivesWithComponentProps = {
        livesWithData: {
          children: Any.randomNumber(),
          dependentAdults: Any.randomNumber(),
          otherAdults: Any.randomNumber(),
          youngAdults: Any.randomNumber(),
          partner: false,
        },
        onSubmit: jest.fn(() => {}),
      };

      const result = setStateFromProps(originalComponentState, newProps);
      expect(result).toEqual(newProps.livesWithData);
    });
  });
});
