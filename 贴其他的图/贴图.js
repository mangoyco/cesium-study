const defined = Cesium.defined;
const combine = Cesium.combine;
const ImageryProvider = Cesium.ImageryProvider;
const WebMapTileServiceImageryProvider =
  Cesium.WebMapTileServiceImageryProvider;

// class C_WebMapTileServiceImageryProvider extends WebMapTileServiceImageryProvider {
//   constructor(options) {
//     super(options);
//   }
//   requestImage(x, y, level, request) {
//     var result;
//     var timeDynamicImagery = this._timeDynamicImagery;
//     var currentInterval;

//     // Try and load from cache
//     if (defined(timeDynamicImagery)) {
//       currentInterval = timeDynamicImagery.currentInterval;
//       result = timeDynamicImagery.getFromCache(x, y, level, request);
//     }

//     // Couldn't load from cache
//     if (!defined(result)) {
//       result = requestImage(this, x, y, level, request, currentInterval);
//     }

//     // If we are approaching an interval, preload this tile in the next interval
//     if (defined(result) && defined(timeDynamicImagery)) {
//       timeDynamicImagery.checkApproachingInterval(x, y, level, request);
//     }

//     return result;
//   }
// }

function requestImage(imageryProvider, col, row, level, request, interval) {
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

// Cesium["C_WebMapTileServiceImageryProvider"] = C_WebMapTileServiceImageryProvider;

let provider = {
  "wmts": "C_WebMapTileServiceImageryProvider",
  "wms": "WebMapServiceImageryProvider",
  "single": "SingleTileImageryProvider",
  "url": "UrlTemplateImageryProvider",
};

function setBaseLayer(param, flag, index) {
  console.log(JSON.parse(JSON.stringify(param)),flag)
  if (flag) {
    let p = { ...param };
    p.provider.tilingScheme =
      p.provider.projection !== "WebMercator"
        ? new Cesium.GeographicTilingScheme()
        : new Cesium.WebMercatorTilingScheme();
    let imageryLayer = new Cesium.ImageryLayer(
      new Cesium[provider[p.type.toLowerCase()]](param.provider),
      param.layer
    );
    imageryLayer.id = param.id;
    viewer.imageryLayers.add(imageryLayer, index);
  } else {
    for (let i = 0; i < viewer.imageryLayers.length; i++) {
      if (viewer.imageryLayers._layers[i].id === param.id) {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(i));
      }
    }
  }
}

function setTerrainLayer(param, flag) {
  if (flag) {
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: param.url,
    });
  } else {
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
  }
}

Cesium["C_layerManager"] = {
  setBaseLayer,
  setTerrainLayer,
};

fetch("./贴其他的图/config.json")
  .then((res) => res.json())
  .then((res) => {
    console.log(res.mapService);
    const imageryLayers = res.mapService.imageryLayers;
    if (imageryLayers && Array.isArray(imageryLayers)) {
      imageryLayers.forEach((item, i) => {
        if (item.preloading && i === 3) {
          Cesium.C_layerManager.setBaseLayer(item, true);
        }
      });
    }
    // const dem = window.$config.mapService.dem;
    // if (dem && Array.isArray(dem)) {
    //     dem.forEach((item) => {
    //         if (item.preloading) {
    //             Cesium.C_layerManager.setTerrainLayer(item, true);
    //         }
    //     });
    // }
  });
