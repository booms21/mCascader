/**
 * mCascader.js
 * 基于JQ、MUI的移动端气泡级联组件mCascader  szl 2021.2
 * https://github.com/booms21/mCascader.git
 */
(function () {
  ("use strict");

  let treeHistoryArr = []; //存储树历史
  let currtTreeArr = []; //当前的树

  //渲染无限级联列表
  function renderTree(data, level) {
    if (currtTreeArr.length == 0) {
      $("#noData").show();
    } else {
      $("#noData").hide();
    }
    //如历史超过一层显示返回按钮
    if (treeHistoryArr.length > 1) {
      $("#goback").show();
    } else {
      $("#goback").hide();
    }
    let dom = "";
    data.forEach(function (item, idx) {
      if (level !== undefined) {
        item.level = level;
      }

      dom +=
        ' <li class="mui-table-view-cell"><a class="mui-navigate-right" index=' +
        idx +
        ">" +
        item.name +
        "</a></li>";
    });

    $(".mui-table-view").empty().html(dom).show();
  }

  //返回上一级
  window.mCascader = function (options) {
    let {
      input: selector, //css选择器
      data = [], //数据
      value = [], //默认值
      separator = "/", //分隔符
      onClick, //选择后的回调
    } = options;
    mCascader.options = options;
    let $input = $(selector);
    $input.click(function () {
      
      //当input点击则默认渲染第一层
      treeHistoryArr = [];
      currtTreeArr = data;
      renderTree(data, 0);
 
      treeHistoryArr.push(currtTreeArr); //放入历史

      mui("#popover").popover("show", $(selector)[0]);

      //事件代理列表项的点击
      $("#mcascader").off().on("click", ".mui-navigate-right", function () {
        
        let idx = $(this).attr("index");
        if (currtTreeArr[idx].id !== $input.data("id")) {
          let levelName = $input.val().split(separator);
          levelName[currtTreeArr[idx].level] = currtTreeArr[idx].name;
          levelName.splice(currtTreeArr[idx].level + 1);
          $input.val(levelName.join(separator)); //给选中的部门增加/层级
          $input.data("id", currtTreeArr[idx].id);
        }
        onClick && onClick(currtTreeArr[idx]);
        if (currtTreeArr[idx].children.length) {
          //把点击项的子树显示出来，并添加当前点击的子树到历史
          let parentIdx = currtTreeArr[idx].level;
          currtTreeArr = currtTreeArr[idx].children;
          treeHistoryArr.push(currtTreeArr);
          renderTree(currtTreeArr, parentIdx + 1);
        }
      });
    });
  };
  //返回上一级
  window.mCascader.goBack = function () {
    //每次返回时把上一个历史树显示
    $(".mui-table-view").show();
    treeHistoryArr.pop();
    currtTreeArr = treeHistoryArr[treeHistoryArr.length - 1];
    renderTree(currtTreeArr);
  };
  //清空mCascader的数据，重置界面
  window.mCascader.clear = function () {
    treeHistoryArr = [];
    currtTreeArr = [];
    $(this.options.input).data("id", "").val("");

    $(".mui-table-view").empty();
    mui("#popover").popover("hide");
  };
})();
