var redWall = viewer.entities.add({
  name: "Red wall at height1",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      121.444409, 31.247417, 200.0, 121.533521, 31.235685, 200.0, 121.563273,
      31.190347, 200.0, 121.546744, 31.194054, 200.0, 121.516705, 31.191459,
      200.0, 121.502188, 31.203074, 200.0,
    ]),
    minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000],
    material: new Cesium.ImageMaterialProperty({
      // image:"2.png",
      image: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], true),
      transparent: true,
    }),
  },
});

viewer.entities.add({
  name: "Red wall at height2",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      121.554409, 31.247417, 200.0, 121.643521, 31.235685, 200.0, 121.673273,
      31.190347, 200.0, 121.656744, 31.194054, 200.0, 121.626705, 31.191459,
      200.0, 121.612188, 31.203074, 200.0,
    ]),
    minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000],
    material: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], true),
  },
});

viewer.entities.add({
  name: "Red wall at height3",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      121.664409, 31.247417, 200.0, 121.753521, 31.235685, 200.0, 121.783273,
      31.190347, 200.0, 121.776744, 31.194054, 200.0, 121.736705, 31.191459,
      200.0, 121.722188, 31.203074, 200.0,
    ]),
    minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000],
    material: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], false),
  },
});

viewer.zoomTo(viewer.entities);

function getColorRamp(elevationRamp, isVertical = true) {
  var ramp = document.createElement("canvas");
  ramp.width = isVertical ? 1 : 100;
  ramp.height = isVertical ? 100 : 1;
  var ctx = ramp.getContext("2d");

  ctx.rect(0, 0, 1, 100);
  ctx.fillStyle = "white";
  ctx.fill();

  var values = elevationRamp;
  var grd = isVertical
    ? ctx.createLinearGradient(0, 0, 0, 100)
    : ctx.createLinearGradient(0, 0, 100, 0);
  grd.addColorStop(values[0], "transparent"); //black
  //grd.addColorStop(values[0], '#000000'); //black
  grd.addColorStop(values[1], "#2747E0"); //blue
  grd.addColorStop(values[2], "#D33B7D"); //pink
  grd.addColorStop(values[3], "#D33038"); //red
  grd.addColorStop(values[4], "#FF9742"); //orange
  grd.addColorStop(values[5], "transparent"); //yellow
  grd.addColorStop(values[6], "#ffffff"); //white

  ctx.fillStyle = grd;
  if (isVertical) ctx.fillRect(0, 0, 1, 100);
  else ctx.fillRect(0, 0, 100, 1);
  return ramp;
}
