import { Meta, StoryObj } from "@storybook/react";
import { InputBox } from "./input";

const meta: Meta<typeof InputBox> = {
  title: "UI/InputBox",
  component: InputBox,
};

export default meta;

type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
  args: {
    placeholder: "olivia@untitledui.com",
  },
  render: (args) => (
    <InputBox {...args} onChange={(value) => console.log(value)} />
  ),
};
