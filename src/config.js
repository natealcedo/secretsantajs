const PORT = process.env.PORT;
const ROOT_MONGO_CONNECTION =
  process.env.NODE_ENV !== "production"
    ? "mongodb://localhost:27017/secretsantajs"
    : process.env.MONGO;
const TELEBOT_CONFIG = {
  token: process.env.TELEGRAM_TOKEN, // Required. Telegram Bot API token.
  polling: {
    // Optional. Use polling.
    interval: 1000, // Optional. How often check updates (in ms).
    timeout: 0, // Optional. Update polling timeout (0 - short polling).
    limit: 100, // Optional. Limits the number of updates to be retrieved.
    retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    // proxy: 'http://username:password@yourproxy.com:8080' // Optional. An HTTP proxy to be used.
  },
  // TODO: switch to webhook once we are ready
  // webhook: { // Optional. Use webhook instead of polling.
  //     key: 'key.pem', // Optional. Private key for server.
  //     cert: 'cert.pem', // Optional. Public key.
  //     url: 'https://....', // HTTPS url to send updates to.
  //     host: '0.0.0.0', // Webhook server host.
  //     port: 443, // Server port.
  //     maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
  // },
  allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
  // usePlugins: ['askUser'], // Optional. Use build-in plugins from pluginFolder.
  // pluginFolder: '../plugins/', // Optional. Plugin folder location relative to telebot package.
  pluginConfig: {
    // Optional. Plugin configuration.
    // myPluginName: {
    //   data: 'my custom value'
    // }
  },
};

export default {
  PORT,
  ROOT_MONGO_CONNECTION,
  TELEBOT_CONFIG,
};
