/**
 * This is the main eleventy configuration file.
 * For options, see: https://www.11ty.dev/docs/config/
 */
const Image = require("@11ty/eleventy-img");
const CleanCSS = require("clean-css");
const markdownDeflist = require("markdown-it-deflist");

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

const svgIconShortcode = async src => {
  const meta = await Image(src, {
    formats: ['svg'],
    dryRun: true,
  });

  return meta.svg[0].buffer.toString();
}

/**
 * This adds and exports all functions, options etc. to eleventy.
 */
/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = config => {
  config.addShortcode('image', imageShortcode);
  config.addFilter('cssmin', cssMinFilter);
  config.addShortcode('svgIcon', svgIconShortcode);

  config.addPassthroughCopy({
		"./public/": "/",
  });

  config.amendLibrary("md", mdLib => mdLib.use(markdownDeflist));

  return {
    // Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

    dir: {
      input: "content",          // default: "."
      includes: "../_includes",  // default: "_includes"
      data: "../_data",          // default: "_data"
      output: "_site"
    },

    pathPrefix: "/",
  };
};