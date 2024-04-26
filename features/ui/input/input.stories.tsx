import { Meta, StoryObj } from "@storybook/react";
import { InputBox } from "./input";
import { InputIcon } from "./input-icon";

const meta: Meta<typeof InputBox> = {
  title: "UI/InputBox",
  component: InputBox,
};

export default meta;

type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: {
    placeholder: "olivia@untitledui.com",
    disabled: false,
    label: "Email",
  },
  render: (args) => (
    <InputBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Icon: Story = {
  args: {
    ...Default.args,
    icon: <InputIcon src="/icons/mail.svg" />,
  },
  render: (args) => (
    <InputBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Hint: Story = {
  args: {
    ...Default.args,
    icon: <InputIcon src="/icons/mail.svg" />,
    hint: "This is a hint text to help user.",
  },
  render: (args) => (
    <InputBox {...args} onChange={(value) => console.log(value)} />
  ),
};

export const Error: Story = {
  args: {
    ...Default.args,
    icon: <InputIcon src="/icons/mail.svg" />,
    hint: "This is a hint text to help user.",
    error: "This is a error message.",
  },
  render: (args) => (
    <InputBox {...args} onChange={(value) => console.log(value)} />
  ),
};
