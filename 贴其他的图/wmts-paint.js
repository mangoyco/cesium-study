const source = {
  type: "WMTS",
  url: "http://192.168.4.122:8310/tilecache/service/wms",
  provider: {
    format: "image/jpeg",
    layer: "Global_Image_JPEG_4326-JPEG-4326", // 这个要有
    maximumLevel: 19,
    projection: "WGS84",
    style: "default",
    tileMatrixSetID: "EPSG:4326", // 这个是必须的好像
    url: "http://192.168.4.120:8310/tilecache/service/wmts"
  },
  layer: {},
};

// source.provider.tilingScheme =
//   source.provider.projection !== "WebMercator"
//     ? new Cesium.GeographicTilingScheme()
//     : new Cesium.WebMercatorTilingScheme();
// ||
source.provider.tilingScheme = new Cesium.GeographicTilingScheme(); // 这行省掉图会展示有误

let imageryLayer = new Cesium.ImageryLayer(
  new Cesium.WebMapTileServiceImageryProvider(source.provider), // 项目中重写了这个方法，文件在下一个js
  source.layer
);
imageryLayer.id = 'random';
viewer.imageryLayers.add(imageryLayer, undefined);
