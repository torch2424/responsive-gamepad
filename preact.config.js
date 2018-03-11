/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {

  if (env.production) {
   // change our outpout directory
   // serving on github pages, so: responsive-gamepad/
   // https://github.com/developit/preact-cli/issues/218
   // https://github.com/developit/preact-cli/pull/323
   config.output.publicPath = "/responsive-gamepad/";
  }
}
