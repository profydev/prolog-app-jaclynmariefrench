import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ProjectError } from "./project-error";

export default {
  title: "project/ProjectError",
  component: ProjectError,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof ProjectError>;

const Template: StoryFn<typeof ProjectError> = () => <ProjectError />;
export const Default = Template.bind({});
