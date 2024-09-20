const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    entry: {
      loading: ["./js/components/loading.js"],
      "user-platform-my-details.style": [
        "./js/styles/user-platform-my-details.style.js",
      ],
      "user-platform-my-groups.style": [
        "./js/styles/user-platform-my-groups.style.js",
      ],
      "user-platform-newsletter.style": [
        "./js/styles/user-platform-newsletter.style.js",
      ],
      "user-platform-events.style": [
        "./js/styles/user-platform-events.style.js",
      ],
      "user-platform.style": ["./js/styles/user-platform.style.js"],
      "enter-user-page.style": ["./js/styles/enter-user-page.style.js"],
      "index-sports.style": ["./js/styles/index-sports.style.js"],
      calendar: ["./js/pages/calendar.page.js"],
      events: ["./js/pages/events.page.js"],
      register: ["./js/pages/register.page.js"],
      "home-events": ["./js/pages/home-events.page.js"],

      "about.style": ["./js/styles/about.style.js"],
      "european-perspective.style": [
        "./js/styles/european-perspective.style.js",
      ],
      "members.style": ["./js/styles/members.style.js"],
      "sublicensee.style": ["./js/styles/sublicensee.style.js"],

      "topics-template.style": ["./js/styles/topics-template.style.js"],
      "library-template.style": ["./js/styles/library-template.style.js"],
      "news-template.style": ["./js/styles/news-template.style.js"],
      "topics.style": ["./js/styles/topics.style.js"],
      "contact.style": ["./js/styles/contact.style.js"],
      "library.style": ["./js/styles/library.style.js"],
      "news.style": ["./js/styles/news.style.js"],

      "components-iframe.style": ["./js/styles/components-iframe.style.js"],
      "gallery.style": ["./js/styles/gallery.style.js"],
      "home.style": ["./js/styles/home.style.js"],
      "filters-bar.style": ["./js/styles/filters-bar.style.js"],

      "index-sports": ["./js/pages/index-sports.page.js"],
    },
    output: {
      path: path.resolve(__dirname, "dist/js"),
      filename: "[name].js",
      clean: true,
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /js\/styles\/\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              compact: true,
              minified: true,
              comments: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            env.NODE_ENV !== "production"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            {
              loader: "sass-loader",
              options: {
                data: `
                  $env: "${env.NODE_ENV}";
                  ${
                    env.NODE_ENV === "development"
                      ? "@import '../styles.scss';@import '../components/loading.scss';"
                      : ""
                  }
                `,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: "asset/resource",
          generator: {
            filename: "./[path][name][ext]",
          },
        },
      ],
    },
  };
};
