# mCascader

mCascader 是一个mui风格的移动端气泡级联框，支持可选择任意层级、默认值、分隔符

引入mui和jq库，及mui_cascader.css（cascader的样式）
```
 <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/mui/3.7.1/js/mui.min.js"></script>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/mui/3.7.1/css/mui.min.css"
      rel="stylesheet"
    />
    <link href="css/mui_cascader.css" rel="stylesheet" />
     <script src="js/mui_cascader.js"></script>
```
## 使用方法：
直接调用mCascader方法，并传入配置项：

   ```
    mCascader({
        input:'#demo', //对应input的id
        data:data, //mCascader 的数据
        value:[''],//mCascader的默认值,默认值节点的id字符串
        separator:'/', //input中的分隔符
        onClick:function(node){ //当选择完成时的回调函数，node为当前点击的点击的节点
          console.log(node)
        }
      });
   ```
      input:
      对应文本框的选择器。字符串类型
      
      data:
      mCascader的数据。Array类型，树结构，data中的节点必须要有以下属性：
      data = [{
      id:'',  // 必须,唯一的id值，String类型
      name:'', //必须,对应mCascader节点的显示文本 ，String类型
      children:[...] //子节点 ，Array类型
      },...]
      
      
      mCascader.back()
      返回上一层级
      
      mCascader.clear();
      清空mCascader数据及重置界面
## 例子：
```
    <div id="mcascaderPopover" class="mui-popover">
      <div class="label">
        <button
          type="button"
          id="goback"
          class="mui-btn mui-btn-outlined"
          onclick="mCascader.goBack()"
        >
          <span class="mui-icon mui-icon-back"></span></button
        >请选择一个节点
      </div>
      <div id="mcascader">
        <p id="noData" style="display: none">无数据</p>
        <ul class="mui-table-view"></ul>
      </div>
    </div>

    <div class="mui-input-row">
      <div class="label"><a href="#mcascaderPopover"></a>节点：</div>

      <input type="text" id="demo"  placeholder="请选择" readonly />
    </div>
  <script src="js/mCascader.js"></script>
  <script>
    var json = [
      {
        name: "节点1",
        id: "1",
        children: [
          { name: "节点11", id: "1-1", children: [] },
          {
            name: "节点12",
            id: "1-2",
            children: [
              { name: "节点122221", id: "1-2-1", children: [] },
              { name: "节点12222222", id: "1-2-2", children: [] },
            ],
          },
          { name: "节点123", id: "1-3", children: [] },
          { name: "节点244", id: "1-4", children: [] },
        ],
      },
      {
        name: "节点2",
        id: "2",
        children: [
          { name: "节点24411111", id: "2-4", children: [] },
          { name: "节点55555", id: "2-7", children: [] },
        ],
      },
    ]; //存储过滤的值
    mCascader({
      input: "#demo", //对应input的id
      data: json, //mCascader 的数据
      value: ["1-2-2"],//mCascader的默认值
      separator: "/", //input中的分隔符
      onClick: function (node) {
        //当选择完成时的回调函数
        console.log(node);
      },
    });
  </script>
```
