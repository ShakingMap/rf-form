const path = require('path');

module.exports = {
    entry: "./test/entry.js",
    output: {
        path: path.resolve(__dirname, 'local'),
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|dist)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                    cacheDirectory: true
                }
            }
        ]
    }
};