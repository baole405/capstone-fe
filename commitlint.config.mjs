const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "docs",
        "style",
        "test",
        "build",
        "ci",
        "chore",
        "perf",
        "revert",
      ],
    ],
  },
};

export default config;
