import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Footer } from "./footer";

export default {
  title: "UI/Footer",
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = () => (
  <div style={{ width: 375 }}>
    <Footer />;
  </div>
);

export const Default = Template.bind({});
