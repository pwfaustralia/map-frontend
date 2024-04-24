import type { Meta, StoryObj } from "@storybook/react";
import LoginTemplate from "../../../components/templates/login/default/LoginTemplate";

const meta = {
  title: "Templates/Login Template",
  component: LoginTemplate,
} satisfies Meta<typeof LoginTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedAsIn: Story = {};

export const LoggedOut: Story = {};
