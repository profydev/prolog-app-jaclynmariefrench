import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonColor, ButtonSize, ButtonVariant } from "./button";

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA", disabled: false },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(ButtonColor),
    },
  },
};

export const Small: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Small },
};

export const Medium: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Medium },
};

export const Large: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.Large },
};

export const XLarge: Story = {
  ...Default,
  args: { ...Default.args, size: ButtonSize.XLarge },
};

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Primary },
};

export const Secondary: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Secondary },
};

export const Gray: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Gray },
};

export const Error: Story = {
  ...Default,
  args: { ...Default.args, color: ButtonColor.Error },
};

export const PrimaryEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Primary,
    variant: ButtonVariant.Empty,
  },
};

export const GrayEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Gray,
    variant: ButtonVariant.Empty,
  },
};

export const ErrorEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    color: ButtonColor.Error,
    variant: ButtonVariant.Empty,
  },
};

// import React from "react";
// import { Meta, StoryFn } from "@storybook/react";
// import { Button } from "./button";
// import { ReactComponent as IconPlaceholder} from '/Users/jaclynfrench/workspace/react-course/prolog-app-jaclynmariefrench/public/icons/message.svg';

// export default {
//   title: "UI/Button",
//   component: Button,
//   argTypes: {
//     size: {
//       options: ["small", "medium", "large", "xlarge"],
//       control: { type: "radio" },
//     },
//     color: {
//       options: [
//         "primary",
//         "secondary",
//         "gray",
//         "empty",
//         "empty-gray",
//         "error",
//         "empty-error",
//       ],
//       control: { type: "radio" },
//     },
//     iconPosition: {
//         options: ['none', 'leading', 'trailing', 'only'],
//         control: { type: 'select' }
//     }
//   },
// } as Meta<typeof Button>;

// const Template: StoryFn = (args) => <Button {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   children: "Button",
//   size: "small",
//   color: "primary",
//   // icon: <IconPlaceholder/>,
//   iconPosition: "none"
// };

// // console.log(IconPlaceholder)
