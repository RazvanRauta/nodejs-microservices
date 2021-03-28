module.exports = {
    env: {
        stripePublicKey:
            'pk_test_51IX7ANAMmGQtQHB5lamnBG1dodeH6CJHsvYcyGv1lIK8BpEmtYrLPdZYwor8T3XON7ISVfLCmb26T0X0RTNPcLSI00Iy8lE3JC',
    },
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 800,
            aggregateTimeout: 300,
        }
        return config
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
        return config
    },
}
