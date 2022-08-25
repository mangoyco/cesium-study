// 准备一个瓦片资源
/*
  照着封装的贴图逻辑捋出来的

  还有疑问...比如url这种格式的学名....
  然后 layer 不太清楚作用是啥
  imageryLayer.id好像随便写
  旋转地球时，url好像有时会返回 无符合影像
  ...记下来再说吧
*/
const source = {
  type:'url',
  url: "http://36.110.12.229:9015/usmaps?tags=x13&tk=7e15aa5a-f449-4257-8932-765d48db9ff9&request=getTile&TileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}",
  provider:{
    projection: "WebMercator", // 说实话这个不太清楚各个值有啥区别
    url: "http://36.110.12.229:9015/usmaps?tags=x13&tk=7e15aa5a-f449-4257-8932-765d48db9ff9&request=getTile&TileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}"
  },
  layer:{}
};

source.provider.tilingScheme = new Cesium.WebMercatorTilingScheme(); // 好像是叫墨卡托投影。。。。总之也是瓦片...
// ↑ 说实话上边这行测了一下没有好像也一样.....
const UrlTemplateImageryProvider = new Cesium.UrlTemplateImageryProvider(source.provider)
let imageryLayer = new Cesium.ImageryLayer(
  UrlTemplateImageryProvider,
  source.layer
);

imageryLayer.id = source.id || 11;
viewer.imageryLayers.add(imageryLayer, undefined);

// ==========================不过总之作用是贴一个瓦片到地图，具体位置什么的感觉是url控制的===================