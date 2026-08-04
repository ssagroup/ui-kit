import { Children, isValidElement, cloneElement } from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';

import Radio from '@components/Radio';
import { resolveDisabled, warnDeprecatedProp } from '@utils/deprecation';

import { RadioGroupBase } from './RadioGroupBase';
import { RadioGroupProps } from './types';

const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    isRequired,
    value,
    defaultValue,
    externalState,
    onChange,
    children,
    className,
    color,
  } = props;

  // Keying on the *presence* of `value` rather than its value is what lets a
  // parent reset to `undefined` and have the group clear: under the old
  // `value !== undefined` test it silently fell back to whatever it was holding
  // internally. See `useControllableState`.
  //
  // `externalState` stays on the semi-controlled path it shipped with — copied
  // into internal state, group still free to move on click — but it now tracks
  // a reset to `undefined` too, which is what it did before #656.
  if (externalState !== undefined) {
    warnDeprecatedProp('RadioGroup', 'externalState', 'value');
  }

  const [activeValue, setActiveValue] = useControllableState<
    string | number | undefined
  >({
    controlled: 'value' in props,
    value,
    defaultValue,
    // The group only ever moves to a radio's value, never to `undefined` —
    // that only happens when the parent resets, which does not route through
    // here. The guard is just what narrows the hook's optional value.
    onChange: (next) => {
      if (next !== undefined) {
        onChange(next);
      }
    },
    semiControlled: {
      active: 'externalState' in props,
      value: externalState,
    },
  });

  const onRadioValueChange = (nextValue: string | number) => {
    setActiveValue(nextValue);
  };

  return (
    <RadioGroupBase
      role="radiogroup"
      aria-required={isRequired}
      className={className}>
      {Children.map(children, (child) => {
        /* istanbul ignore else*/
        if (isValidElement(child) && child.type === Radio) {
          const { id, value: radioValue, text } = child.props;

          return cloneElement(child, {
            key: id,
            name,
            value: radioValue,
            checked: activeValue === radioValue,
            disabled: resolveDisabled(
              'Radio',
              child.props.disabled,
              child.props.isDisabled,
            ),
            isRequired,
            text,
            onChange: onRadioValueChange,
            color: child.props.color ?? color,
          });
        }
      })}
    </RadioGroupBase>
  );
};

export default RadioGroup;
