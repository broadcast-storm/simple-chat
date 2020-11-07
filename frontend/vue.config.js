module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/styles.scss";`,
            },
        },
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                svgo: {
                    plugins: [
                        { removeDimensions: true },
                        { removeViewBox: false },
                    ],
                },
            })
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.transformAssetUrls = {
                    img: 'src',
                    image: 'xlink:href',
                    'b-avatar': 'src',
                    'b-img': 'src',
                    'b-img-lazy': ['src', 'blank-src'],
                    'b-card': 'img-src',
                    'b-card-img': 'src',
                    'b-card-img-lazy': ['src', 'blank-src'],
                    'b-carousel-slide': 'img-src',
                    'b-embed': 'src',
                }

                return options
            })
    },
    devServer: {
        proxy: {
            '^/api/': {
                target: 'http://127.0.0.1:3000/',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    // outputDir must be added to Django's TEMPLATE_DIRS
    outputDir: './dist/',
    // assetsDir must match Django's STATIC_URL
    assetsDir: 'static',
}
