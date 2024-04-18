import { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from "./select";

const meta: Meta<typeof SelectBox> = {
  title: "UI/SelectBox",
  component: SelectBox,
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
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
