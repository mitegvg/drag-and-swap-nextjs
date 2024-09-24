import React from "react";
import Title from "./Title";

export default {
  title: "Components/Title",
  component: Title,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
};

const Template = (args) => <Title {...args}>Sample Title</Title>;

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
