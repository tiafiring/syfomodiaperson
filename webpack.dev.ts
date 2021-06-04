import { merge } from "webpack-merge";
import mockEndepunkter from "./mock/mockEndepunkter";

const express = require("express");
const common = require("./webpack.common.ts");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    inline: true,
    staticOptions: {
      redirect: false,
    },
    after: (app, server, compiler) => {
      mockEndepunkter(app);
      app.use("/static", express.static(path.resolve(__dirname, "dist")));

      app.use("*", (req, res) => {
        const filename = path.join(compiler.outputPath, "index.html");
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            res.sendFile(path.resolve(__dirname, "public/error.html"));
            return;
          }

          res.set("Content-Type", "text/html");
          res.send(result);
          res.end();
        });
      });
    },
  },
});
