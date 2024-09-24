import { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  // ...
  // framework: '@storybook/react-webpack5', 👈 Remove this
  // 👈 Add this
  framework: "@storybook/experimental-nextjs-vite",

  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-webpack5-compiler-babel"],
};

export default config;
