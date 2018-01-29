var path=require('path');
var webpack=require('webpack');
var htmlWebpackPlugin=require('html-webpack-plugin');
var openBrowserWebpackPlugin=require('open-browser-webpack-plugin');
module.exports={
    entry:'./src/index.jsx',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bunble.js'
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    module:{
        rules:[
            //css解析
            {
                test:/\.css$/,
                loader:"style-loader!css-loader!postcss-loader"
            },
            //less解析  注意要装less
            {
                test:/\.less$/,
                loader:"style-loader!css-loader!postcss-loader!less-loader"
            },
            // jsx解析 babel-core babel-loader babel-preset-latest babel-preset-react
            {
                test:/\.(jsx|js)?$/,
                loader:"babel-loader",
                exclude:/node_modules/,
                query:{presets:['latest','react']}
            },

            //图片解析
            {
                test: /\.(png|jpg|gif|jpeg|bmp)$/,
                exclude:/node_modules/,
                loader: 'url-loader?limit=10000&name=build/images/[name].[ext]'
            },

            //文字解析
            {
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader:'url-loader?limit=500000'
            }
        ]
    },

    plugins:[
        //生成HTML文件
        new htmlWebpackPlugin({
            template:'./src/index.tmpl.html',
            hash:true
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM":'react-dom',
            "$":"jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserWebpackPlugin({
            url:'http://localhost:9090'
        }),
        //为组件和模块分配ID
        new webpack.optimize.OccurrenceOrderPlugin()

    ],

    // 调用npm install --save-dev webpack-dev-server
     devServer:{

        contentBase: "./build",
        historyApiFallback: true, //不跳转
        inline: true ,//实时刷新
         port:9090,  //端口8080
         hot: true , // 使用热加载插件 HotModuleReplacementPlugin



    }
}