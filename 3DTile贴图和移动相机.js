// 这是展示一个3DTile的贴图并添加动画
// var tileset = new Cesium.Cesium3DTileset({
//   url: "http://www4.skylineglobe.com/SG/b3dm/Hod-Hasharon_Build_3_Entire_2705.1724701/tileset.json",
// });
// viewer.scene.primitives.add(tileset);
// //创建平移矩阵方法二
// var translation = Cesium.Cartesian3.fromArray([0, 0, -120]);
// m = Cesium.Matrix4.fromTranslation(translation);
// //生效
// tileset._modelMatrix = m;
// // viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(40, 0, 500));
// let initialHeading = 0;
// // 步长
// let step = 0.05;
// // let setIntervalID = setInterval(intervalFn, step * 1000);
// // 定义轮询函数
// function intervalFn() {
//   if (initialHeading > 360) {
//     initialHeading = 0;
//   }
//   var offset = new Cesium.HeadingPitchRange(
//     Cesium.Math.toRadians(initialHeading), // 水平方向的旋转角 0-360度
//     -Cesium.Math.toRadians(20), // 垂直平面俯仰角 // 0-90度
//     500 // 相机距离地球球心的距离
//   );
//   viewer.zoomTo(tileset, offset);
//   initialHeading += step;
// }
// intervalFn();
//方法二，直接调用函数，调整高度,height表示物体离地面的高度
// 这个是官网教程的方法
// function changeHeight(height) {
//   height = Number(height);
//   if (isNaN(height)) {
//     return;
//   }
//   var cartographic = Cesium.Cartographic.fromCartesian(
//     tileset.boundingSphere.center
//   );
//   var surface = Cesium.Cartesian3.fromRadians(
//     cartographic.longitude,
//     cartographic.latitude,
//     cartographic.height
//   );
//   var offset = Cesium.Cartesian3.fromRadians(
//     cartographic.longitude,
//     cartographic.latitude,
//     height
//   );
//   var translation = Cesium.Cartesian3.subtract(
//     offset,
//     surface,
//     new Cesium.Cartesian3()
//   );
//   tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
// }
