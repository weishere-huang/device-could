const webpack = require('webpack');
module.exports = {
    entry: {
        bundle: [
            'vue',
            'element-ui'
            //其他库
            ],
    },
    output: {
        path: '/dist',
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: '/dist/bundle.manifest.json',
            name: '[name]_library',
        })
    ]
};