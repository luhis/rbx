import { checkA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

import "../src/index.sass";

setOptions({
  name: "React Bulma Components",
  showAddonPanel: true,
  url: "https://github.com/couds/react-bulma-components",
});

addDecorator(
  withInfo({
    // propTables: false,
    source: false,
  }),
);
addDecorator(withKnobs);
addDecorator(checkA11y);

function loadStories() {
  const req = require.context("../src", true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
