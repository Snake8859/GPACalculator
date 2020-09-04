// pages/chart/pieChart.js
var app=getApp();
var radioState; //保存单选按钮的状态 -- name

var pie=[];  //用于保存单科绩点*学分 --单科
var pie1 = []; //用于保存单科绩点*学分 --多科

var allCredit_pie;  //用于保存总学分  --单科
var allCredit_pie1;  //用于保存总学分  --多科

var pieGPA=[];   //用于保存每个学科对平均绩点做的贡献--单科
var pieGPA1 = [];  //用于保存每个学科对平均绩点做的贡献--多科

var course = [];  //用于保存学科名 --单科
var course1 = [];  //用于保存学科名 --多科


var position =[]; //用于记录排序前的位置 --单科
var position1 = []; //用于记录排序前的位置 --多科

var otherGPA=0; //用于保存前五位之后的每个学科对平均绩点贡献的总和 --单科
var otherGPA1 = 0; //用于保存前五位之后的每个学科对平均绩点贡献的总和 --多科
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:'calculate',value:'单科连续计算'},
      {name:'calculate1',value:'多科一次性计算'}
    ]
  },
  //单选按钮属性改变事件
  radioChange:function(e){
      //console.log(e);
      radioState=e.detail.value;
      //console.log(radioState);


  },

  //计算，获得占比例最大的前五位
  calculate:function(){

   //如果选择单科连续计算
    if (radioState =='calculate'){
      pie= app.globalData.pieData;
      //console.log(pie);
      allCredit_pie = app.globalData.pieCredit;
      //console.log(allCredit_pie);
      for(var i=0;i<pie.length;i++){
        pieGPA[i]=pie[i]/allCredit_pie;
        position[i]=i;  //记录原来的位置
      }
     // console.log(pieGPA);
      course = app.globalData.pieDataName;
      //console.log(course);
      //冒泡排序，并记录原有位置
      this.BubbleSortTest(pieGPA,position);
      //console.log(pieGPA);
     // console.log(position);
      for(var i=5;i<pieGPA.length;i++){
        otherGPA=otherGPA+pieGPA[i];
      }
    }

    //如果选择多科一次性计算
    if (radioState =='calculate1'){
      pie1 = app.globalData.pieData1;
      allCredit_pie1 = app.globalData.pieCredit1;
      for (var i = 0; i < pie1.length; i++) {
        pieGPA1[i] = pie1[i] / allCredit_pie1;
        position1[i] = i+1;  //记录原来的位置
      }
    //冒泡排序，并记录原有位置
      this.BubbleSortTest(pieGPA1, position1);
      for (var i = 5; i < pieGPA1.length; i++) {
        otherGPA1 = otherGPA1 + pieGPA1[i];
      }
    }
  },


  //冒泡排序，并记录原有位置
  BubbleSortTest:function(gpa,p){
    var tmp=0;
    for(var i=0;i<gpa.length;i++){
        for(var j=0;j<gpa.length-i;j++){
          if(gpa[j]>gpa[j-1]){
            //从大到小排序，把较小的交换到后面来
            tmp=gpa[j-1];
            gpa[j-1]=gpa[j];
            gpa[j]=tmp;
            //记录位置
            tmp = p[j - 1];
            p[j - 1] = p[j];
            p[j] = tmp;
          }
        }
    }
  },
  showPie:function(){
    this.calculate();
    var windowsHeight = 0;
    //console.log(pieGPA1);
    //console.log(position1);
    /*
    console.log(pieGPA);
    console.log(course);
    console.log(position);
    console.log(otherGPA);
    */
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res.windowWidth)
        windowsHeight = parseInt(res.windowWidth);
      }
    })

    if(pieGPA.length >= 6 && radioState =='calculate'){
      var Charts = require('../../utils/wxcharts.js');
      new Charts({
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: course[position[0]],
          data: pieGPA[0]
        },{
            name: course[position[1]],
          data: pieGPA[1]
        },{
            name: course[position[2]],
          data: pieGPA[2]
        },{
            name: course[position[3]],
          data: pieGPA[3]
        },{
            name: course[position[4]],
          data: pieGPA[4]
        },{
          name: '其他',
          data: otherGPA
        }
        ],
        width: windowsHeight,
        height: 250,
        dataLabel: true
      });
    }

      if (pieGPA1.length >= 6 && radioState == 'calculate1'){
        var Charts = require('../../utils/wxcharts.js');
        new Charts({
          canvasId: 'pieCanvas',
          type: 'pie',
          series: [{
            name: '课程'+position1[0],
            data: pieGPA1[0]
          }, {
              name:'课程'+position1[1],
            data: pieGPA1[1]
          }, {
              name: '课程' +position1[2],
            data: pieGPA1[2]
          }, {
              name: '课程' +position1[3],
            data: pieGPA1[3]
          }, {
              name: '课程' + position1[4],
            data: pieGPA1[4]
          }, {
            name: '其他',
            data: otherGPA1
          }
          ],
          width: windowsHeight,
          height: 250,
          dataLabel: true
        });
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})