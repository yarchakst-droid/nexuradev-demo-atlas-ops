module.exports = {
  apps: [
    {
      name: "demo-atlas",
      cwd: __dirname,
      script: "node_modules/.bin/next",
      args: "start -p 3212 -H 127.0.0.1",
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
