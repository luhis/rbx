import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkbox, Control, Label } from "@/elements";
import { CheckboxProps } from "@/elements/form/checkbox";
import { Section } from "@/layout";

export type ControlledCheckboxProps = Omit<CheckboxProps, "onChange">;
export interface ControlledCheckboxState {
  checked?: boolean;
}

export class ControlledCheckbox extends React.PureComponent<
  ControlledCheckboxProps,
  ControlledCheckboxState
> {
  public readonly state: ControlledCheckboxState;

  constructor(props: ControlledCheckboxProps) {
    super(props);
    this.state = { checked: props.checked || false };
  }

  public render() {
    const { children, name, value } = this.props;
    return (
      <Control>
        <Label disabled={this.props.disabled} specifier="checkbox">
          <Checkbox
            checked={this.state.checked}
            name={name}
            onChange={() =>
              this.setState(({ checked }) => ({ checked: !checked }))
            }
            value={value}
          />
          {children}
        </Label>
      </Control>
    );
  }
}

export const knobs = {
  checked: (title: string = "Checked") => boolean(title, false),
  disabled: (title: string = "Disabled") => boolean(title, false),
};

storiesOf("Elements/Form/Checkbox", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const checked = knobs.checked();
    const disabled = knobs.disabled();
    return (
      <Control>
        <Label disabled={disabled} specifier="checkbox">
          <Checkbox checked={checked} disabled={disabled} /> I agree to the{" "}
          <a href="#">terms and conditions</a>
        </Label>
      </Control>
    );
  })
  .add("Controlled", () => {
    return (
      <ControlledCheckbox name="agreed">
        {" "}
        I agree to the <a href="#">terms and conditions</a>
      </ControlledCheckbox>
    );
  });
