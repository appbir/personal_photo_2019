window.onload = function () {


  // 根据配置动态创建image标签

  // 获取动态生成的配置
  function getConfig(cb) {
    fetch('./config/pathConfig.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (config) {
        cb(config);
      });
  }

  /**
   *  通过配置生成完整路径  目前展示部分相册和目录
   * @param {*} config 
   */
  function getAllPicturePath(config, parentPath) {
    let seperator = "/";
    let result = [];
    for (var key in config) {
      let path = parentPath ? parentPath + seperator + key : key;
      if (config[key]) { // 表示目录
        result = result.concat(getAllPicturePath(config[key], path));
      } else {
        result.push(path);
      }
    }
    return result;
  }


  /**
   * 指定节点追加图片
   */
  function appendImageNode(path) {
    let prefix = './src/assert/';
    if (!path) return;
    let src = prefix + path;
    let img = $('<li><img src="' + src + '"></li>');
    $('.box-pictures').append(img);
  }

  // 采用 viewer.js // TODO 后续深入研究
  function viewRender() {
    var $image = $('#image');

    $image.viewer({
      inline: true,
      viewed: function () {
        $image.viewer('zoomTo', 1);
      }
    });

    // Get the Viewer.js instance after initialized
    var viewer = $image.data('viewer');

    // View a list of images
    $('#images').viewer();
  }

  /**
   * 展示不处理目录结构 -- 后续考虑相册
   */
  function createImage() {
    getConfig(function (config) { // 获取到后端配置
      // 获得所有的路径
      let paths = getAllPicturePath(config);
      for (var i = 0; i < paths.length; i++) {
        appendImageNode(paths[i]);
      }
      // 执行图片渲染显示
      viewRender();
    })
  }


  // <li><img src="./src/assert/caoyuan/DSC_0026.JPG" alt="Picture 1"></li>


  createImage();




}