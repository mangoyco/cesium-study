// 1.4版本的cesium，蓝色的可以移动
// 1.9版本的不可以移动 不清楚为什么
// 现在好像知道为什么了
// viewer.clock.shouldAnimate 这个控制页面底部时间轴是否走动 两个版本测试后好像一个默认开启，一个默认关闭
// 所以如果想让他走动，需要加上最后那行代码

var viewer = new Cesium.Viewer("cesium-container", {
  // imageryProvider: new Cesium.SingleTileImageryProvider({
  //     url: '../img/worldimage.jpg'
  // }),
  baseLayerPicker: false,
});

var czml = [
  {
    "id": "document",
    "name": "polygon",
    "version": "1.0",
    "clock": {
      "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
      "currentTime": "2012-08-04T16:00:00Z",
      "multiplier": 10,
    },
  },
  {
    "id": "shape2",
    "name": "Red box with black outline",
    "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
    /*"position" : {
      "cartographicDegrees" : [-66.62557, 516.92809, 100.0]
    },*/
    "box": {
      "dimensions": {
        "cartesian": [30.0, 30.0],
      },
      "material": {
        "stripe": {
          "orientation": "VERTICAL",
          "evenColor": {
            "rgba": [10, 211, 250, 0],
          },
          "oddColor": {
            "rgba": [10, 211, 250, 255],
          },
          "offset": {
            "number": 1,
          },
          "repeat": 0.5,
        },
      },
    },
    "path": {
      "material": {
        "solidColor": {
          "color": {
            "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
            "rgba": [255, 0, 0, 128],
          },
        },
      },
      "width": [
        {
          "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "number": 3.0,
        },
      ],
      "show": [
        {
          "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "boolean": true,
        },
      ],
    },
    "position": {
      "interpolationAlgorithm": "LAGRANGE",
      "interpolationDegree": 1,
      "epoch": "2012-08-04T16:00:00Z",
      "cartographicDegrees": [
        0.0, 118.87841653400005, 30.95679870500004, 0.0, 10.0,
        118.87826541800007, 30.95680770900003, 0.0, 20.0, 118.8774481050001,
        30.956860625000047, 0.0, 30.0, 118.87660414600009, 30.956910105000077,
        0.0, 40.0, 118.8759846580001, 30.95694296000005, 0.0, 50.0,
        118.87542502500003, 30.956978761000073, 0.0, 60.0, 118.87473380100005,
        30.957024103000037, 0.0,
      ],
    },
  },
];

var dataSourcePromise;
var i = 30.957024;
var a = 60;
setInterval(function () {
  i += 0.0001;
  a += 10;
  czml[1].position.cartographicDegrees.push(a, 118.8747338, i, 0);
  czml[0].clock.currentTime = viewer.clock.currentTime.toString();
  viewer.entities.removeAll();
  viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
}, 1000);

dataSourcePromise = Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);

// viewer.clock.shouldAnimate = true;
