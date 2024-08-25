import type { Meta, StoryObj } from "@storybook/react";
import Bookmark from "./bookmark";

const meta: Meta<typeof Bookmark> = {
  title: "Dashboard/Bookmark",
  component: Bookmark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    url: "https://news.ycombinator.com/",
    title: "Hacker News",
    icon: "icons/56a7ea210e686a58a0bc17add7c827cc.png",
  },
};
