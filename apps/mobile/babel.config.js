module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@smart-task-manager/shared": "../../packages/shared",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
