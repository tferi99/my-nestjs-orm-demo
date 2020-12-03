const PROXY_CONFIG = {
  "/andphone/**": {
    "target": "http://apas.dev.org:8080",
    "secure": false,
    "logLevel": "debug",
    "bypass": function (req, res, proxyOptions) {
      if (req.url.indexOf("/andphone/andclient") !== -1) {
        console.log("Skipping proxy for browser request: " + req.url);
        return req.url;
      }

    }
  }
}

module.exports = PROXY_CONFIG;
