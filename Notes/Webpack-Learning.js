// Entry Points

    const config = {
        entry: './path/to/my/entry/file.js'
    };

    module.exports = config;

    // The single entry syntax for the entry property is a shorthand for:
    const config = {
        entry: {
            main: './path/to/my/entry/file.js'
        }
    };

    // Object Syntx: Usage: entry: {[entryChanName: string]: string|Array<string>}
    const config = {
        entry: {
            app: './src/app.js',
            vendors: './scr/vendor.js'
        }
    };
    //Multi Page Application:
    const config = {
        entry: {
            pageon:     './src/pageOne/index.js',
            pagetwo:    './src/pageTwo/index.js',
            pageThree:  './src/pageThree/index.js'
        }
    };

// Output:
    const config ={
        output: {
            filename: 'bundle.js',
            path: '/home/proj/public/assets' // This configuartion would output a single bundle.js file into the /home/proj.public/assets directory
        }
    };
    module.exports = config;

    //Multiple Entry Points:
    const config = {
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist'
        }
    }; // writes to disk: ./dist/app.js, ./dist/search.js

    //Advanced: Here is more complicated example of using CDN and hashes for assets:
    const config ={
        output: {
            path: "/home/proj/cdn/assets/[has]",
            publicPath: "http://cdn.example.com/assets/[hash]/"
        }
    };
    // in cases when the eventual publicPath of out files isn't known at compile time, it can be left blank and set dynamically
    //at runtime in the entry point file. if you don't know the pulicPath while compiling , you can omit and set __webpack_public_path on you entry point.
    __webpack_public_path__ = myRuntimePublicPath
    //rest of your application entry

//Loaders:
    //To instruct webpack to use the css-loader for every .css file and the ts-loader for all .ts files:
    module.export = {
        module: {
            rules: [
                { test: /\.css$/, use: 'css-loader'},
                { test: /\.ts$/, use: 'ts-loader'}
            ]
        }
    };
    
    //Configuration: module.rules: allows you to specify serveral loaders wihtin your webpack configuration.
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    {loader: 'style-loader'},
                    {
                        loader:'css-loader',
                        option: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }

    //Inline: It's possible to specify loaders in an import statment, or any equivalent "importing" method.
    //Seperate loaders fromt eh resource with !
    //Each part is resolved relative to the current directory.
    import Style from 'style-loader!css-loader? modules! ./styles.css';

    //CLI: You can also use loader through the CLI:
    webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
    //This uses the jade-loader for .jade files, and the style-loader and css-loader for .css files.

//Plugins:
    //Anatomy: ConsoleLogOnBuildWebpackPlugin.js
    function ConsoleLogOnBuildWebpackPlugin() {

    };
    ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) { // Function.prototype.apply method you can pass any function as plugin (this will point to the compiler). you can use this style to inline custom plugins in your configuration.
        compiler.plugin ('run', function(compiler, callback) {
            console.log("The webpack build process is starting!!!");

            callback();
        })
    }

    //Usage: Since the plugins can take arguments/options, you must pass a new instance to the plugins property in you webpack configuration.
             // Depending on how you are using webpack, there are multiple ways to use plugins.
        //Configuration: webpack.config.js:
        const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
        const webpack           = require(webpack);// to access built-in plugins
        const  path             = require('path');

        const config = {
            entry: './path/to/my/entry/file.js',
            output: {
                filename: 'my-first-webpack.bundle.js',
                path: path.resolve(__dirname,'dist')
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        use: 'babel-loader'
                    }
                ]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin(),
                new HtmlWebpackPlugin({template: './src/index.html'})
            ]
        };

        module.exports = config;

    //Node API: when using Node API, users should pass plugins via the plugins property in the configuration.
                //Using the compiler.apply should not the recommended way.
    //some-node-script.js:
        const webpack       = require ('webpack'); // to access webpack runtime
        const configuartion = require ('./webpack.config.js');

        let compiler = webpack(configuartion);
        compiler.apply(new webpack.ProgressPlugin());

        compiler.run(function(err, stats) {
            //...
        })

//Configuration: The following examples below describe how webpack's configuration object can both expressive and configurable because it's code:
    //The Simplest Configuration: webpack.config.js:
        var path = require('path');

        module.export ={
            entry: './foo.js',
            output: {
                path: path.resolve (__dirname, 'dist'),
                filename: 'foo.bundle.js'
            }
        };

//Module Resolution:
    import foo from 'path/to/module'
    // or 
    require('path/to/module')
    
    //Resolving rules in webpack: Using enhanced-resolve, webpack can resolve three kinds of file paths:
        //Absolute paths:
        import "/home/me/file";
        import "C:\\Users\\me\\file";
        //Since we already have the absolute path to the file, no further resolution is required.

    //Relative Paths:
        import "../src/file";
        import "./file2";
    
    //Module paths:
        import "module";
        import "module/lib/file";
    
//Targets:
    //Usage: To set the target property, you simply set the value in your webpack config:
        //webpack.config.js
        module.export = {
            target: 'node'
        };
    
        //Multiple Targets: Although webpack does not support multiple string being passed into the target property,
                            // you can create an isomorphic library by bundleing two separate configurations:
                            //webpack.config.js:
                            var path = require ('path');
                            var serverConfig = {
                                target: 'node',
                                output: {
                                    path: path.resolve(__dirname, 'dist'),
                                    filename: 'lib.node.js'
                                }
                                //...
                            };
                            var clientConfig ={
                                target: 'web', // <== can be omitted as default is 'web'
                                outpurt: {
                                    path: path.resolve(__dirname, 'dist'),
                                    filename: 'lib..js'
                                }
                                //...
                            };

                            module.exports =[ serverConfig, clientConfig ];
                            // The exple above will create a lib.js and lib.node.js file in your dist folder.2




