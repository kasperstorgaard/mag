/**
 * This is the main eleventy configuration file.
 * For options, see: https://www.11ty.dev/docs/config/
 */
const path = require("path");
const Image = require("@11ty/eleventy-img");
const CleanCSS = require("clean-css");

/**
 * Image shortcode
 */
const imageShortcode = async (
  src,
  alt,
  className = undefined,
  widths = [400, 800, 1280],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) => {
  const metadata = await Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: '_site/assets/images',
    urlPath: '/assets/images',
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: className,
  });
};

/**
 * CSS minifier filter
 */
const cssMinFilter = code => {
  return new CleanCSS({}).minify(code).styles;
}

/**
 * This adds and exports all functions, options etc. to eleventy.
 */
/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = config => {
  config.addShortcode('image', imageShortcode);
  config.addFilter('cssmin', cssMinFilter);
  config.addPassthroughCopy('assets/fonts');
};