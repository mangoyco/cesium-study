function computeCircle(radius) {
  var positions = [];
  for (var i = 0; i < 360; i++) {
    var radians = Cesium.Math.toRadians(i);
    positions.push(
      new Cesium.Cartesian2(
        radius * Math.cos(radians),
        radius * Math.sin(radians)
      )
    );
  }
  return positions;
}

var redTube = viewer.entities.add({
  name: "Red tube with rounded corners",
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -85.0, 32.0, -85.0, 36.0, -89.0, 36.0, -89.0, 32.0, -85.0, 32,
    ]),
    shape: computeCircle(60000.0),
    //颜色回调
    material: new Cesium.ColorMaterialProperty(
      new Cesium.CallbackProperty(function () {
        // return Cesium.Color.fromRandom({
        //   minimumRed: 0.75,
        //   minimumGreen: 0.75,
        //   minimumBlue: 0.75,
        //   alpha: 1.0,
        // });
      }, false)
    ),
  },
});
