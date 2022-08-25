// wms的瓦片
/*
  和之单纯的url不一样！
  1.provider里必须要有layers!!! 这个值...可能是后端定下的？
*/
const source = {
  type: "WMS",
  url: "http://192.168.4.122:8310/tilecache/service/wms",
  provider: {
    projection: "WebMercator", // 说实话这个不太清楚各个值有啥区别
    url: "http://192.168.4.122:8310/tilecache/service/wms",
    // ↓ 这些应该也是provider可以配置的属性
    // format: "image/jpeg",
    layers: "Global_Vector_Map-JPEG-3857", // 即这个是必须的
    // maximumLevel: 19,
    // style: "default",
    // tileMatrixSetID: "EPSG:3857"
  },
  layer: {},
};

source.provider.tilingScheme = new Cesium.WebMercatorTilingScheme(); // 好像是叫墨卡托投影。。。。总之也是瓦片...
// ↑ wms这行是不能省略的
let imageryLayer = new Cesium.ImageryLayer(
  new Cesium.WebMapServiceImageryProvider(source.provider), // 看来wms的要用这个api
  source.layer
);

imageryLayer.id = source.id; // 这个id应该也可以随便写
viewer.imageryLayers.add(imageryLayer, undefined);
