import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ProjectError, ProjectErrorProps } from "./project-error";

export default {
  title: "project/ProjectError",
  component: ProjectError,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof ProjectError>;

const Template: StoryFn<ProjectErrorProps> = (args) => (
  <ProjectError {...args} />
);
export const Default = Template.bind({
  onRetry: () => alert("Retry button clicked"),
});
