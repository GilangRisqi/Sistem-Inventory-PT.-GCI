const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      app: "./src/js/app.js",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions", "not dead"],
                    },
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-classes",
                "@babel/plugin-transform-async-to-generator",
              ],
            },
          },
        },
      ],
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
        publicPath: "/",
      },
      hot: true,
      historyApiFallback: true,
      compress: true,
      port: 3000,
      host: "0.0.0.0",
      https: true, // Enable HTTPS for PWA development
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
        "Service-Worker-Allowed": "/",
      },
      // Disable Workbox warnings in development
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      // Setup before hook to copy development service worker
      setupMiddlewares: (middlewares, devServer) => {
        if (!isProduction) {
          const fs = require("fs");
          const path = require("path");

          // Copy development service worker
          devServer.app.get("/sw.js", (req, res) => {
            const swPath = path.join(__dirname, "src", "sw-dev.js");
            if (fs.existsSync(swPath)) {
              res.setHeader("Content-Type", "application/javascript");
              res.setHeader("Service-Worker-Allowed", "/");
              res.sendFile(swPath);
            } else {
              res.status(404).send("Service worker not found");
            }
          });
        }

        return middlewares;
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/app-fixed.webmanifest",
            to: "./",
          },
          {
            from: "./src/app.webmanifest",
            to: "./",
          },
          {
            from: "./src/manifest.json",
            to: "./",
          },
          {
            from: "./src/images",
            to: "images",
            noErrorOnMissing: true,
          },
          {
            from: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            to: "css/",
          },
          {
            from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
            to: "js/",
          },
          {
            from: "./node_modules/bootstrap-icons/font/bootstrap-icons.css",
            to: "css/",
          },
          {
            from: "./src/css",
            to: "css",
          },
        ],
      }),
      // Workbox Plugin for Service Worker generation - only in production
      ...(isProduction
        ? [
            new WorkboxWebpackPlugin.GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              directoryIndex: null,
              navigateFallback: "/index.html",
              navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
              // Increase maximum file size for caching
              maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB (default is 2MB)
              // Enable clean up of outdated caches
              cleanupOutdatedCaches: true,
              // Development mode adjustments
              mode: isProduction ? "production" : "development",
              // Exclude large files from precaching but allow runtime caching
              manifestTransforms: [
                (manifestEntries) => {
                  const manifest = manifestEntries.filter((entry) => {
                    // Skip precaching for very large files but keep them for runtime caching
                    const isLargeImage =
                      entry.url.includes("logoheader.png") ||
                      entry.url.includes("logods.png") ||
                      entry.url.includes("logods2.png") ||
                      entry.url.includes("logods3.png") ||
                      entry.url.includes("cpgci.png");
                    const isLargeJS =
                      entry.url.includes("vendors.bundle.js") &&
                      entry.size > 3 * 1024 * 1024;
                    return !isLargeImage && !isLargeJS;
                  });
                  return { manifest };
                },
              ],
              runtimeCaching: [
                // Cache for large vendor bundles
                {
                  urlPattern: /vendors\..*\.bundle\.js$/,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "vendor-bundles",
                    expiration: {
                      maxEntries: 5,
                      maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                // Cache for large images
                {
                  urlPattern:
                    /(?:logoheader|logods|logods2|logods3|cpgci)\.png$/,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "large-images",
                    expiration: {
                      maxEntries: 20,
                      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                    plugins: [
                      {
                        cacheKeyWillBeUsed: async ({ request }) => {
                          // Use URL as cache key for better cache management
                          return request.url;
                        },
                      },
                    ],
                  },
                },
                {
                  urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
                  handler: "StaleWhileRevalidate",
                  options: {
                    cacheName: "external-libraries",
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "cdn-cache",
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "images",
                    expiration: {
                      maxEntries: 200,
                      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /\.(?:js|css)$/,
                  handler: "StaleWhileRevalidate",
                  options: {
                    cacheName: "static-assets",
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /\.(?:html)$/,
                  handler: "NetworkFirst",
                  options: {
                    cacheName: "html-pages",
                    expiration: {
                      maxEntries: 50,
                      maxAgeSeconds: 24 * 60 * 60, // 1 day
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
              ],
              exclude: [/\.map$/, /manifest$/, /\.htaccess$/],
              swDest: "sw.js",
            }),
          ]
        : []),
      // Optional: WebpackPwaManifest for automatic icon generation
      /*
      new WebpackPwaManifest({
        name: 'Sistem Inventory PT. GCI',
        short_name: 'GCI Inventory',
        description: 'Aplikasi Inventory dan Daily Report untuk PT. Grand Central Indonesia',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        publicPath: './',
        fingerprints: false,
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/images/icons/icon-72x72.png'),
            sizes: [72, 96, 128, 144, 152, 192, 384, 512],
            purpose: 'any maskable'
          }
        ]
      }),
      */
    ],
    output: {
      filename: isProduction
        ? "[name].[contenthash].bundle.js"
        : "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          // Split Bootstrap separately
          bootstrap: {
            test: /[\\/]node_modules[\\/](bootstrap)[\\/]/,
            name: "bootstrap",
            chunks: "all",
            priority: 30,
          },
          // Split core-js separately (polyfills)
          polyfills: {
            test: /[\\/]node_modules[\\/](core-js|@babel\/runtime)[\\/]/,
            name: "polyfills",
            chunks: "all",
            priority: 25,
          },
          // Split other vendors
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            // Split large vendors into smaller chunks
            maxSize: 3 * 1024 * 1024, // 3MB max per chunk
          },
          // Common modules from src
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
    performance: {
      hints: isProduction ? "warning" : false,
      maxAssetSize: 3 * 1024 * 1024, // 3MB (increased from 250KB)
      maxEntrypointSize: 5 * 1024 * 1024, // 5MB (increased from 250KB)
    },
  };
};
