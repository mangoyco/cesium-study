var wyoming = viewer.entities.add({
  name: "Wyoming",
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
      -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
      -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
      -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
    ]),
    height: 0, // 离地面的高度
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
  // description: "这里是需要点击一下才能看的", //方法一
});

viewer.zoomTo(wyoming);

// 描述的写法方法二
wyoming.description =
  '\
  <img\
    width="50{ac3c4da2cd0600a7fb5dd7ece3d30a0eed29da11cf2830143610191d982c65a1}"\
    style="float:left; margin: 0 1em 1em 0;"\
    src="//cesiumjs.org/images/2015/02-02/Flag_of_Wyoming.svg"/>\
  <p>\
    Wyoming is a state in the mountain region of the Western \
    United States.\
  </p>\
  <p>\
    Wyoming is the 10th most extensive, but the least populous \
    and the second least densely populated of the 50 United \
    States. The western two thirds of the state is covered mostly \
    with the mountain ranges and rangelands in the foothills of \
    the eastern Rocky Mountains, while the eastern third of the \
    state is high elevation prairie known as the High Plains. \
    Cheyenne is the capital and the most populous city in Wyoming, \
    with a population estimate of 62,448 in 2013.\
  </p>\
  <p>\
    Source: \
    <a style="color: WHITE"\
      target="_blank"\
      href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
  </p>';
