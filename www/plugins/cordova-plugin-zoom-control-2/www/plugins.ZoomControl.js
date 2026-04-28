cordova.define("cordova-plugin-zoom-control-2.ZoomControl", function(require, exports, module) {
// creating plugin
var exec = require("cordova/exec");

function ZoomControl() {
}

ZoomControl.prototype.ZoomControl = function (enabled) {
  exec(null, function (error) {
    console.log("Error calling ZoomControl::ZoomControl:", error);
  }, "ZoomControl", "ZoomControl", [enabled]);
};
ZoomControl.prototype.setBuiltInZoomControls = function (enabled) {
  exec(null, function (error) {
    console.log("Error calling ZoomControl::setBuiltInZoomControls:", error);
  }, "ZoomControl", "setBuiltInZoomControls", [enabled]);
};
ZoomControl.prototype.setDisplayZoomControls = function (enabled) {
  exec(null, function (error) {
    console.log("Error calling ZoomControl::setDisplayZoomControls:", error);
  }, "ZoomControl", "setDisplayZoomControls", [enabled]);
};
ZoomControl.prototype.setUseWideViewPort = function (enabled) {
  exec(null, function (error) {
    console.log("Error calling ZoomControl::setUseWideViewPort:", error);
  }, "ZoomControl", 'setUseWideViewPort', [enabled]);
};

var zoomControl = new ZoomControl();
module.exports = zoomControl;

});
