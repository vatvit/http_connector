module.exports = {
    apps: [
        {
            name: 'http_connector',
            script: './index.js',
            max_restarts: 7,
            min_uptime: 240000,
            kill_timeout: 10000,
            exec_mode: 'fork',
            instances: 1,

            watch_options: {
                followSymlinks: false,
                interval: 1000,
            },

            env: {
                NODE_ENV: "development",
            },
        },
    ],
};
