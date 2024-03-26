import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    size: {
      options: ["small", "medium", "large", "xlarge"],
      control: { type: "radio" },
    },
    color: {
      options: [
        "primary",
        "secondary",
        "gray",
        "empty",
        "empty-gray",
        "error",
        "empty-error",
      ],
      control: { type: "radio" },
    },
    // icon: {
    //     options: ['none', 'leading', 'trailing', 'only'],
    //     control: { type: 'select' }
    // }
  },
} as Meta<typeof Button>;

const Template: StoryFn = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  size: "small",
  color: "primary",
  // icon: "none"
};
