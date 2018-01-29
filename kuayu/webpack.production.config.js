
/*里面要安装一个css js分离的包*/
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
var pkg=require('./package.json');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;/*合并公共代码*/
var ExtractTextPlugin = require('extract-text-webpack-plugin');/*分离css与js*/
module.exports = {
    entry:{
        app:"./src/index.jsx",
        venor:Object.keys(pkg.dependencies)
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath:'http://192.168.1.101:3001/dist/',
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            //.jsx文件 babel-core babel-loader babel-preset-es2015 babel-preset-react
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{presets:['react','es2015']}
            },
        //.css 文件  style-loader css-loader postcss-loader
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({fallback:'style-loader',use:['css-loader','postcss-loader']})
            },
            {
                test:/\.less$/,
                loader:ExtractTextPlugin.extract({fallback:'style-loader',use:['css-loader','less-loader','postcss-loader']})
            },
            {
                test:/\.(png|gif|jpg|jpeg|bmp)$/i,
                loader:'url-loader?limit=10&name=images/[name].[ext]'
            },
            {
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader:'url-loader?limit=10&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM":'react-dom',
            "$":"jquery"
        }),
        new htmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html",
            hash:true
        }),
        new CommonsChunkPlugin({
            name:'common',
            filename:'js/[name].js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}