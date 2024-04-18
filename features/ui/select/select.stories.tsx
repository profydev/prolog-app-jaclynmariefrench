import { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from "./select";
import { SelectIcon } from "./select-icon";

const meta: Meta<typeof SelectBox> = {
  title: "UI/SelectBox",
  component: SelectBox,
};

export default meta;

type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
    placeholder: "Please choose",
    disabled: false,
  },
  render: (args) => (
    <SelectBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Icon: Story = {
  ...Default,
  args: {
    ...Default.args,
    icon: <SelectIcon src="/icons/user.svg" />,
  },
  render: (args) => (
    <SelectBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "Label",
  },
  render: (args) => (
    <SelectBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Hint: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "Label",
    hint: "This is hint text to help users.",
  },
  render: (args) => (
    <SelectBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Error: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: "Label",
    hint: "This is hint text to help users.",
    errorText: "This has an error.",
  },
  render: (args) => (
    <SelectBox {...args} onChange={(value) => console.log(value)} />
  ),
};
