// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[
      {
        id: 'calculate',

        name: '单科连续计算',
        
        page:'calculate'
      }, 
      {
        id: 'calculate1',

        name: '多科一次计算',

        page:'calculate1'
      }
      ]
  },

  //跳转计算器
  kindToggle:function(e){
    //console.log(e.currentTarget.id + "/" + e.currentTarget.id);
    wx.navigateTo({
      url: "../calculate/" + e.currentTarget.id
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})