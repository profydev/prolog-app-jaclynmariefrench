import { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from "./select";

const meta: Meta<typeof SelectBox> = {
  title: "UI/SelectBox",
  component: SelectBox,
};

export default meta;

type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  render: () => (
    <SelectBox
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        // Add more options as needed
      ]}
      onChange={(value) => console.log(value)}
    />
  ),
};
