# mCascader

mCascader 是一个移动端气泡级联框
建议配合mui的项目使用，引入mui和jq库，及mui_cascader.css（cascader的样式）
```
 <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/mui/3.7.1/js/mui.min.js"></script>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/mui/3.7.1/css/mui.min.css"
      rel="stylesheet"
    />
    <link href="css/mui_cascader.css" rel="stylesheet" />
```


## 例子：
```
      <div id="popover" class="mui-popover">
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
        <div class="label"><a href="#popover"></a>节点：</div>

        <input
          type="text"
          id="demo"
          data-id=""
          placeholder="请选择"
          readonly
        />
      </div>


    <script>
      var json = [
        {
          name: "节点1",
          id: "1",
          children: [
            { name: "节点11", id: "1-1", children: [] },
            { name: "节点12", id: "1-2", children: [] },
            { name: "节点123", id: "1-3", children: [] },
            { name: "节点244", id: "1-4", children: [] },
          ],
        },
        { name: "节点2", id: "2", children: [ { name: "节点24411111", id: "2-4", children: [] }, { name: "节点55555", id: "2-4", children: [] }] },
      ]; //存储过滤的值
      mCascader({
        input:'#demo', //对应input的id
        data:json, //mCascader 的数据
        separator:'/', //input中的分隔符
        onClick:function(data){ //当选择完成时的回调函数
          console.log(data)
        }
      });
    </script>
```
