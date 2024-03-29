import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize } from "./button";

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button };

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button CTA" },
};

export const Small: Story = {
  args: { ...Default.args, size: ButtonSize.Small },
};

export const Medium: Story = {
  args: { ...Default.args, size: ButtonSize.Medium },
};

export const Large: Story = {
  args: { ...Default.args, size: ButtonSize.Large },
};

export const XLarge: Story = {
  args: { ...Default.args, size: ButtonSize.XLarge },
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
