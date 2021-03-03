module.exports = {
  apps: [
    {
      name: 'Dominate Log Server',
      script: './main.js',
      error: './logs/error.log',
      output: './logs/server.log',
      log_type: 'json',
    },
  ],
};
