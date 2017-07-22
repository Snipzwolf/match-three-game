var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './js');
var APP_DIR = path.resolve(__dirname, './js');

var config = {
    entry: APP_DIR + '/main.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {test: /\.jsx?/,include : APP_DIR,loaders: ["babel"] },
            {test: /\.css$/, loader: "style!css" },
            {test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
            	'file?hash=sha512&digest=hex&name=[hash].[ext]',
            	'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']
        	}
        ]
    },
    externals: {
		//jquery: 'jQuery'
	}

};

module.exports = config;
