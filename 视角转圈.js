//开启 tick
viewer.clock.shouldAnimate = true;
//每次旋转的弧度 越小越慢
var angle = Cesium.Math.toRadians(Math.PI * 0.1);
// 旋转次数 用来控制停止
var rotate_num = 0;

function onTickCallback() {
  viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, angle);
  //以下用来控制 停止
  rotate_num++;
  // 110 次旋转一周
  // if (rotate_num === 110) {
  //结束旋转
  // viewer.clock.onTick.removeEventListener(onTickCallback);
  //可以再接定位动画
  // viewer.camera.flyTo({......})
  //  }
}
// 利用时钟进行监听
viewer.clock.onTick.addEventListener(onTickCallback);

// 这种方式好像是监听的事件轴的方式
