// https://geo.datav.aliyun.com/areas_v3/bound/630000_full.json 青海省的轮廓
// https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json 全国的轮廓
viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load(
    "https://geo.datav.aliyun.com/areas_v3/bound/630000_full.json",
    {
      // stroke: Cesium.Color.HOTPINK,
      // fill: Cesium.Color.PINK.withAlpha(0.5),
      // strokeWidth: 3
    }
  )
);

viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load("./自定义.geojson", { // datav工具自己制作的geo数据
    // stroke: Cesium.Color.HOTPINK,
    // fill: Cesium.Color.PINK.withAlpha(0.5),
    // strokeWidth: 3
  })
);
