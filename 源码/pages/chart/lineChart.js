// pages/chart/chart.js
var GPAS = [0, 0, 0, 0, 0, 0, 0, 0];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    semester: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'],
    init_info: ''
  },
  realnameConfirm: function (e) {
    //console.log("绑定成功");
    //console.log(e);
    var id = e.target.id;
    //console.log(id);
    var array_id = parseInt(id / 2);
    //console.log(array_id);
    var GPA = parseFloat(e.detail.value);
    //console.log(GPA);
    GPAS[array_id] = GPA;
    /*if (GPA>5.0){
      this.setData({
        init_info: ''
      })
    }
    else{
      GPAS[array_id] = GPA;
    }
    */
  },
  showline:function(){
    var windowsHeight = 0;
    wx.getSystemInfo({
      success: function (res) {

        //console.log(res.windowWidth)
        windowsHeight = parseInt(res.windowWidth);
      }
    })
    var Charts = require('../../utils/wxcharts.js');
   //初步数据显示完成
   //线状图
    new Charts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'],
      series: [{
        name: '绩点',
        data: GPAS,
        format: function (val) {
          return val.toFixed(2) + '';
        }
      }],
      yAxis: {
        title: '绩点',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowsHeight-12,
      height: 200
    });
  
  }
  

})



