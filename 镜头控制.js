// setView
// Cartesian3方式
// viewer.camera.setView({
//   destination: Cesium.Cartesian3.fromDegrees(116.435314, 39.960521, 15000.0), // 设置位置

//   orientation: {
//     heading: Cesium.Math.toRadians(20.0), // 方向
//     pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
//     roll: 0,
//   },
// });

// rectangle 方式
// view.camera.setView({
//   destination: Cesium.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0), //west, south, east, north  这个其实不大很懂啥意思
//   orientation: {
//     heading: Cesium.Math.toRadians(20.0), // 方向
//     pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
//     roll: 0,
//   },
// });

// 上边这两处好像除了位置信息格式不一样...别的好像没啥区别




// 这个是有动画的那种，就是飞到相应的坐标，或者经纬度，感觉这个比较常用
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.435314, 39.960521, 15000.0), // 设置位置
  orientation: {
    heading: Cesium.Math.toRadians(20.0), // 方向
    pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
    roll: 0,
  },
  duration: 5, // 设置飞行持续时间，默认会根据距离来计算
  complete: function () {
    // 到达位置后执行的回调函数
  },
  cancle: function () {
    // 如果取消飞行则会调用此函数
  },
  pitchAdjustHeight: -90, // 如果摄像机飞越高于该值，则调整俯仰俯仰的俯仰角度，并将地球保持在视口中。
  maximumHeight: 5000, // 相机最大飞行高度
  flyOverLongitude: 100, // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度(这个，很好用)
});


// lookAt
var center = Cesium.Cartesian3.fromDegrees(114.44455, 22.0444); //camera视野的中心点坐标
var heading = Cesium.Math.toRadians(50.0);
var pitch = Cesium.Math.toRadians(-20.0);
var range = 5000.0;
view.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
