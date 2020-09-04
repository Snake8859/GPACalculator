//index.js
//获取应用实例
var app = getApp()
//绩点计算部分
var showMessageLine =[];  //显示信息的数组
var allCredit=0;          //总学分
var creditArray =[];      //单科学分之和
var AVG_GPA = [];             //单科平均绩点集合
var allGPA = 0; //平均学分绩点的和

/*
滑动部分
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
*/
Page({
  data: {
    text:"无", 
    GPA: "0", 
  },
  //事件处理函数


  onLoad: function () {
    var that = this
  },

  /*
  onShow: function () {
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMove = e.changedTouches[0].pageX;
    // 向左滑动   
    if (touchMove - touchDot <= -40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向右滑动");
      wx.navigateTo({
        url: '../calculate/calculate1'
      })
    }
    // 向右滑动   
    if (touchMove - touchDot >= 40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.navigateTo({
        url: '../calculate/calculate'
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
*/

  //检查单科成绩不超过100
  checkGrade:function(e){
    var grade = e.detail.value;
    //console.log(grade);
   var grade_int = parseInt(grade);
   if(grade_int>100){
     this.setData({
       form_info: ''
       //到时候再后面再添加一条提示错误消息  -- 未实现
     })
   }
  },
  //检查单科学分不超过5.5
  checkCredit: function (e) {
    var credit = e.detail.value;
    //console.log(grade);
    var credit_float = parseFloat(credit);
    if (credit_float > 5.5) {
      this.setData({
        form_info: ''
        //到时候再后面再添加一条提示错误消息 --未实现
      })
    }
  },


  //表单提交函数
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var course = e.detail.value.course;
    var grade = e.detail.value.grade;
    var credit = e.detail.value.credit;
    //如果所填不为空，进入计算
    if(course!=''||grade!=''||credit!=''){
    this.calculate(course, grade, credit);
    }
    //如果所填为空，提示不能为空
    else{
      wx.showModal({
        title: '提示',
        content: '输入内容不能为空',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
        /*this.setData({
          text:'输入内容不为空'
        })*/
    }

    
  },
  /*
  计算处理函数组
  1.综合计算
  2.单科绩点计算
  3.总学分计算
  4.平均绩点计算
  */
  //1.综合计算
  calculate: function (course, grade,credit){
    //console.log("绑定成功");
    var credit_float; //单科学分
    //防止出现null后无法再填的问题
    if(credit==''){
      credit_float=0;
    }else{
      credit_float =parseFloat(credit);
    }
    var singlGPA = this.calculateSinglGPA(grade);   //计算单科绩点
    var allCredit = this.calculateAllCredit(credit_float); //计算总学分
    var AVG_GPA = this.calculateAVG(allCredit, singlGPA, credit_float);  //计算平均绩点
    //console.log(AVG_GPA.toFixed(3));
    //console.log(course, singlGPA, allCredit);
    creditArray.push(credit_float);   //统计每科学分
    showMessageLine.push("课程名:" + course + "  " + "单科绩点:" + singlGPA + "  " + "   " + "学分:" + credit_float)
    app.globalData.pieDataName.push(course); //用于保存学科名，为饼状图提供数据
   // extraLine.push(course + "  " + singlGPA + "  " + "   " + allCredit);
    this.setData({
      text: showMessageLine.join('\n'),
      form_info:'',  // 提交后清空表单数据
      GPA: AVG_GPA.toFixed(3)
    })
  },
  //2.单科绩点计算
  calculateSinglGPA:function(grade){
    if(grade==100){
        return 5;
    }
     else if(grade>=90&&grade<100){
      return 5-(100-grade)/10;
    }
     else if (grade >= 80 && grade < 90) {
      return 4 - (90 - grade) / 10;
    }
    else if (grade >= 70 && grade < 80) {
      return 3 - (80 - grade) / 10;
    }
    else if (grade >= 60 && grade < 70) {
      return 2 - (70 - grade) / 10;
    }
    else{
      return 0;
    }
  },
  //3.总学分计算
  calculateAllCredit: function (credit_float){
    allCredit = allCredit + credit_float;
    app.globalData.pieCredit = allCredit;  //用于保存总学分，为饼状图提供数据
    //console.log(allCredit);
    return allCredit;
  },
  //4.平均绩点计算
  calculateAVG: function (allcredit, singlGPA, credit_float){
    app.globalData.pieData.push((singlGPA * credit_float)); //用于保存学分*单科绩点，为饼状图提供数据
    AVG_GPA.push(singlGPA * credit_float);
     //获得数组最后一项 i -1
      var i = (AVG_GPA.length);
      allGPA = allGPA + AVG_GPA[i-1];
     // console.log(allGPA);
      return allGPA/allcredit;
  },


  //存在着删除最后一个项，但是没有在总学分总删除其对应的单科学分(解决)
  //删除处理函数
  deleteResult:function(event){

    if (showMessageLine.length > 0) {
    //删除对应的单科学分
    var i=0;
    i =creditArray.length;
    allCredit = allCredit - creditArray[i-1];
    //console.log(allCredit);
    creditArray.pop();

    //删除对应的单科学分绩点
    i=AVG_GPA.length;
    allGPA = allGPA - AVG_GPA[i - 1];
    //console.log(allGPA);
    AVG_GPA.pop();
    //console.log(allGPA/allCredit);
      showMessageLine.pop()
      this.setData({
        text: showMessageLine.join('\n'),
        GPA: allGPA / allCredit
      })
  }
  }

})

/*
  存在问题：删除到最后一个的时候平均绩点变成了null，接下就无法计算了(解决)
*/