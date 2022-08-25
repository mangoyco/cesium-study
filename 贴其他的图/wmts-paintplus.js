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
    url: "http://192.168.4.120:8310/tilecache/service/wmts",
  },
  layer: {},
};
source.provider.tilingScheme = new Cesium.GeographicTilingScheme(); // 这行省掉图会展示有误

// 生态的项目里重写了这个方法（构造函数）原因不知道...
const defined = Cesium.defined;
const ImageryProvider = Cesium.ImageryProvider;
class C_WebMapTileServiceImageryProvider extends Cesium.WebMapTileServiceImageryProvider {
  constructor(option) {
    super(option);
  }
  // 这里是 Cesium.WebMapTileServiceImageryProvider原型链上的requestImage方法，感觉像是单纯的重写
  // function(e, t, n, i) {
  //   let r;
  //   const o = this._timeDynamicImagery;
  //   let a;
  //   return (
  //     defined(o) && ((a = o.currentInterval), (r = o.getFromCache(e, t, n, i))),
  //     defined(r) || (r = requestImage(this, e, t, n, i, a)),
  //     defined(r) && defined(o) && o.checkApproachingInterval(e, t, n, i),
  //     r
  //   );
  // }

  requestImage(x, y, level, request) {
    // console.log(x, y, level, request);
    // return Cesium.WebMapTileServiceImageryProvider.prototype.requestImage.call(
    //   this,
    //   x,
    //   y,
    //   level,
    //   request
    // );
    var result;
    var timeDynamicImagery = this._timeDynamicImagery;
    var currentInterval;
    // Try and load from cache
    if (defined(timeDynamicImagery)) {
      currentInterval = timeDynamicImagery.currentInterval;
      result = timeDynamicImagery.getFromCache(x, y, level, request);
    }
    // Couldn't load from cache
    if (!defined(result)) {
      result = requestImage(this, x, y, level, request, currentInterval);
    }
    // If we are approaching an interval, preload this tile in the next interval
    if (defined(result) && defined(timeDynamicImagery)) {
      timeDynamicImagery.checkApproachingInterval(x, y, level, request);
    }
    return result;
  }
}

function requestImage(imageryProvider, col, row, level, request, interval) { // 恕我直言这个方法是现在还理解不了....不认识的属性有点多
  console.log(imageryProvider, col, row, level, request, interval);
  var labels = imageryProvider._tileMatrixLabels;
  var tileMatrixSetID = imageryProvider._tileMatrixSetID;
  var label = defined(labels) ? labels[level] : level.toString();
  var tileMatrix = tileMatrixSetID ? tileMatrixSetID + ":" + label : label;
  var subdomains = imageryProvider._subdomains;
  var staticDimensions = imageryProvider._dimensions;
  var dynamicIntervalData = defined(interval) ? interval.data : undefined;
  var resource;
  if (!imageryProvider._useKvp) {
    var templateValues = {
      TileMatrix: tileMatrix,
      TileRow: row.toString(),
      TileCol: col.toString(),
      s: subdomains[(col + row + level) % subdomains.length],
    };

    resource = imageryProvider._resource.getDerivedResource({
      request: request,
    });
    resource.setTemplateValues(templateValues);

    if (defined(staticDimensions)) {
      resource.setTemplateValues(staticDimensions);
    }

    if (defined(dynamicIntervalData)) {
      let date = new Date(dynamicIntervalData.Time);
      let dynamicIntervalDataValues = {
        yy: date.getFullYear(),
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        layer: imageryProvider._layer,
      };
      resource.setTemplateValues(dynamicIntervalDataValues);
    }
  } else {
    // build KVP request
    var query = {};
    query.tilematrix = tileMatrix;
    query.layer = imageryProvider._layer;
    query.style = imageryProvider._style;
    query.tilerow = row;
    query.tilecol = col;
    query.tilematrixset = imageryProvider._tileMatrixSetID;
    query.format = imageryProvider._format;

    if (defined(staticDimensions)) {
      query = combine(query, staticDimensions);
    }

    if (defined(dynamicIntervalData)) {
      query = combine(query, dynamicIntervalData);
    }
    resource = imageryProvider._resource.getDerivedResource({
      queryParameters: query,
      request: request,
    });
  }

  return ImageryProvider.loadImage(imageryProvider, resource);
}

Cesium["C_WebMapTileServiceImageryProvider"] =
  C_WebMapTileServiceImageryProvider;

let imageryLayer = new Cesium.ImageryLayer(
  new Cesium.C_WebMapTileServiceImageryProvider(source.provider),
  source.layer
);
imageryLayer.id = "random";
viewer.imageryLayers.add(imageryLayer, undefined);
