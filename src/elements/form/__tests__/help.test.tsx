import Enzyme from "enzyme";
import React from "react";

import { Help } from "../help";

import { hasProperties } from "@/__tests__/helpers";

describe("Help component", () => {
  hasProperties(Help, {
    defaultProps: { as: "p" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Help />);
    expect(wrapper.is("p")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "div";
    const wrapper = Enzyme.shallow(<Help as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Help ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".help").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<Help />);
    expect(wrapper.hasClass("help")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Help className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
