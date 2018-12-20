import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Message } from "@/components";
import { MESSAGE_SIZES } from "@/components/message/message";
import { Delete } from "@/elements";
import { Section } from "@/layout";

import { colorKnob } from "../common";
import { iterableToSelectObject } from "../utils";

export const knobs = {
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(MESSAGE_SIZES, { undefined: "" }), ""),
};

storiesOf("Components/Message", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const color = colorKnob();
    const size = knobs.size();
    return (
      <Message color={color || undefined} size={size || undefined}>
        <Message.Header>
          <p>Hello world</p>
          <Delete as="button" />
        </Message.Header>
        <Message.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
          nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
          purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac{" "}
          <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
          sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi
          magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales
          sem.
        </Message.Body>
      </Message>
    );
  })
  .add("Body only", () => {
    const color = colorKnob();
    const size = knobs.size();
    return (
      <Message color={color || undefined} size={size || undefined}>
        <Message.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
          nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
          purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac{" "}
          <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
          sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi
          magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales
          sem.
        </Message.Body>
      </Message>
    );
  });
