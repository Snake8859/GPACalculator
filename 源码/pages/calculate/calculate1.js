// pages/index/index1.js
/*var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
*/
// 在页面中定义插屏广告
let interstitialAd = null
var app =getApp();
//var array_now=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
var array_now = [0, 1, 2, 3, 4, 5,6,7,8];  //框数组
var grades=[];    //成绩数组
var credits=[];   //学分数组
var SinglGPA =[];  //单科绩点数组
var count=3;     //避免不填信息，然后删除导致问题
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: array_now,
    init_info:'',
    GPA_message:'0'
  },
  onLoad: function () {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-1e14ebc57a48d68f'
      })
      interstitialAd.onLoad(() => { 
        console.log("插屏广告加载")
      })
      interstitialAd.onError((err) => { 
        console.log("插屏广告失败")
      })
      interstitialAd.onClose(() => { 
        console.log("插屏广告失败")
      })
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
        url: '../index/index1'
      })
    }
    // 向右滑动   
    if (touchMove - touchDot >= 40 && time < 10 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.navigateTo({
        url: '../index/index'
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  */
  //动态添加课程
  addArray:function(e){
    //console.log(e.detail.target.id);
    var button_id = e.detail.target.id;
      //如果是点击添加按钮

    if(button_id=='add'){
      //用于保存数据最后一项
      var lastArray;
      //console.log("绑定成功" + lastArray);
     var count_add = parseInt(e.detail.value.conut);
     count = count + count_add;
      for (var i = 0; i < count_add * 3; i++) {
        lastArray = parseInt(array_now[array_now.length - 1]);
        array_now.push(lastArray + 1);
      }
      
      /* for(var i=0;i<array_now.length;i++){
         console.log(array_now[i]);
       }
       */
      this.setData({
        array: array_now
      })
    }


    if(button_id=='delete'){
      //如果是点击删除按
      //console.log("绑定成功" + lastArray);
      var count_delete = parseInt(e.detail.value.conut);
      if (count_delete * 3 < array_now.length) { //确保删除个数小于课程数
        for (var i = 0; i < count_delete * 3; i++) {
          if (array_now.length > 0) {
            array_now.pop();
          }
        }
          //等号情况位置任意
        /* for(var i=0;i<array_now.length;i++){
           console.log(array_now[i]);
         }
         */
        //console.log("删除时的计算数组长度:"+SinglGPA.length)
        var arrayLenght = SinglGPA.length;
        for(var i=0;i<count_delete;i++){
      
          if (SinglGPA.length > 0 && arrayLenght==count){
                SinglGPA.pop();
                credits.pop();
                grades.pop();
            }
        }
        count = count - count_delete;
        this.setData({
          array: array_now,
        })
      }
    }
    //console.log("当前所拥有的课程数:"+count);
  },
  //失去聚焦事件
  getForm: function (e) {
    //console.log(e);
    var id = parseInt(e.target.id);
   // console.log(id);
    //console.log(grade);
    if(id%3==1){
      var id_grade = parseInt(id / 3)+1;
      var grade = parseFloat(e.detail.value);
      grades[id_grade]=grade;
    }
    if(id%3==2){
    var id_credit = parseInt(id / 3) + 2;
      var credit = parseFloat(e.detail.value);
      credits[id_credit]=credit;
    }
  },

  //计算绩点  伪表单提交  成绩数组浪费第1位(第1位为空) 学分数组浪费第1,2位(第1,2位为空)
  calculation: function (e) {
    //计算单科绩点
    for(var i=1;i<grades.length;i++){
      //console.log("成绩数组下标:"+i+" "+grades[i]);
      var SinglGPA_float = this.calculateSinglGPA(grades[i]);
      SinglGPA[i-1]=SinglGPA_float;
     // console.log(SinglGPA[i-1]);
    }
    //计算总学分
    var allcredit = this.calculateAllCredit();
    //console.log(allcredit);
    app.globalData.pieCredit1=allcredit;   //保存总学分
    //计算单科绩点*学分总和
    var GPA_Credit = this.calulateGPA_Credit();
    //console.log(GPA_Credit);
    var GPA=GPA_Credit/allcredit;
    //console.log(GPA);
    //判断GPA是否为空
   
    if(!isNaN(GPA)){
      this.setData({
        GPA_message: GPA.toFixed(3)
        //GPA_message: GPA
      })
    }
    else{
      //若为空，则是输入内容为空
      wx.showModal({
        title: '提示',
        content: '输入内容不能为空',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }
  },
  //计算总学分
  calculateAllCredit:function(){
    var allcredit = 0;     //总学分
    for (var i = 2; i < credits.length; i++) {
      //console.log("学分数组下标:"+i+" "+credits[i]);
      var credit = credits[i];
      allcredit = allcredit + credit;
    }
    //console.log(allcredit);
    return allcredit;
  },

  //计算单科绩点*学分
  calulateGPA_Credit:function(){
      var GPA_Credit = 0; //单科绩点×单科学分总和
      //console.log("计算时的数组长度:"+SinglGPA.length);
      for (var i = 0; i < SinglGPA.length; i++) {
        GPA_Credit = GPA_Credit + SinglGPA[i] * credits[i + 2];
        app.globalData.pieData1.push(SinglGPA[i]*credits[i+2]);  //保存单科绩点*学分
      }
      //console.log(GPA_Credit);
      return GPA_Credit;
  },
  //单科绩点计算
  calculateSinglGPA: function (grade) {
    if (grade == 100) {
      return 5;
    }
    else if (grade >= 90 && grade < 100) {
      return 5 - (100 - grade) / 10;
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
    else {
      return 0;
    }
  },
  //清空按钮
  clear: function(){
    this.setData({
      init_info:'',
      GPA_message:'0'
    })
    credits=[];
    grades=[];
  }
})
  /*
      存在删除过头的问题(解决)
   */
  