// 添加一个正方体
// var redBox = viewer.entities.add({
//   name : 'Red box with black outline',
//   position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
//   box : {
//     dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
//     material : Cesium.Color.RED.withAlpha(0.5),
//     outline : true,
//     outlineColor : Cesium.Color.BLACK
//   }
// });
// viewer.zoomTo(viewer.entities);

// 这个是长方体的czml版本
// var czml = [
//   {
//     id: "document",
//     name: "box",
//     version: "1.0",
//   },
//   {
//     id: "shape2",
//     name: "Red box with black outline",
//     position: {
//       cartographicDegrees: [-107.0, 40.0, 300000.0],
//     },
//     box: {
//       dimensions: {
//         cartesian: [400000.0, 300000.0, 500000.0],
//       },
//       material: {
//         solidColor: {
//           color: {
//             rgba: [255, 0, 0, 128],
//           },
//         },
//       },
//       outline: true,
//       outlineColor: {
//         rgba: [0, 0, 0, 255],
//       },
//     },
//   },
// ];
// var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
// viewer.dataSources.add(dataSourcePromise);
// viewer.zoomTo(dataSourcePromise);
