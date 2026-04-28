cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    },
    {
      "id": "cordova-plugin-zoom-control-2.ZoomControl",
      "file": "plugins/cordova-plugin-zoom-control-2/www/plugins.ZoomControl.js",
      "pluginId": "cordova-plugin-zoom-control-2",
      "clobbers": [
        "cordova.plugins.ZoomControl"
      ]
    },
    {
      "id": "mo-force-app-close.plugin",
      "file": "plugins/mo-force-app-close/www/plugin.js",
      "pluginId": "mo-force-app-close",
      "clobbers": [
        "MOForceAppClose"
      ],
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-x-toast": "2.7.2",
    "cordova-plugin-zoom-control-2": "0.4.2",
    "mo-force-app-close": "1.0.0"
  };
});