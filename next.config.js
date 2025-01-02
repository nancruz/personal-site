module.exports = {
    output: "standalone",
    swcMinify: true,
    webpack: function (config) {
        config.module.rules.push({ test: /\.md$/, use: "raw-loader" });

        return config;
    },
};
