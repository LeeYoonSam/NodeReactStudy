var webpack = require('webpack');

module.exports = {
    // 배포시 제거
    // devtool : 'eval-source-map',
    entry: './src/index.js',
 
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
 
    devServer: {
        port: 3000,
        contentBase: __dirname + '/public/',
        inline : true
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
          },
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
 
    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                {
                  test: /\.css$/,
                  loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                }
            ]
    }
};