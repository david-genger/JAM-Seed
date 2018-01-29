// This is the actual metalsmith configuration script.
import Metalsmith from "metalsmith";
import markdown from "metalsmith-markdown";
import layouts from "metalsmith-layouts";
import assets from "metalsmith-assets";
import permalinks from "metalsmith-permalinks";
import fingerprint from "metalsmith-fingerprint-ignore";
import prismic from "metalsmith-prismic";
import metalsmithInPlace from "metalsmith-in-place";
import collections from "metalsmith-collections";
import pagination from "metalsmith-pagination";
var helpers = require("handlebars-helpers")();
var sitemap = require('metalsmith-mapsite');
// import { report } from "metalsmith-debug-ui";
// var timer = require('metalsmith-timer');

import paths from "../paths";
import { DebugPlugin, StatisticsPlugin } from "./metalsmith-helpers";

const __PROD__ = process.env.NODE_ENV === "production";

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  // .clean(true)
  .source(paths.metalsmithSource)
  .destination(paths.metalsmithDestination)
  .use(
    prismic({
      url: "https://nussi-portfolio.cdn.prismic.io/api",
      // linkResolver: function(ctx, doc) {
      //   if (doc.isBroken) return;
      //   if(doc.type == 'cabinets_page') {
      //     return "/doors/" + doc.slug;
      //   }
      //   return "/" + doc.type + "/" + doc.slug;
      // }
    })
  )
  // .use(
  //   collections({
  //   })
  // )
  .use(
    metalsmithInPlace()
  )
  .use(
    permalinks({
      relative: false
    })
  )
  .use(
    layouts({
      engine: "handlebars",
      default: "default.hbs",
      directory: "src/layouts/layout-templates",
      partials: "src/layouts/partials",
      partialExtension: ".hbs",
      helpers: {
        helpers: helpers
      },
      remane: true
    })
  )
  .use(sitemap({
    omitExtension: true,
    omitIndex: true,
    hostname: 'https://'
  }))
  .use(
    assets({
      source: "./src/assets",
      destination: "./assets"
    })
  )
  // .use(
  //   assets({
  //     source: "./src/redirects",
  //     destination: "./"
  //   })
  // )