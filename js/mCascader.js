/**
 * mCascader.js
 * 基于JQ、MUI的移动端气泡级联组件mCascader  szl 2021.2
 * https://github.com/booms21/mCascader.git
 */
(function () {
  ("use strict");

  let treeHistoryArr = []; //存储树历史
  let currtTreeArr = []; //当前的树
  let $mcascaderList = null; //存储当前节点列表dom
  let defaultNodeName = []; //默认值的节点name
  /**
   * 渲染节点当前的列表
   * @param {列表} data
   * @param {层级0为第一层}} level
   */
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
        item.level = level; //记录当前层级
      }

      dom +=
        ' <li class="mui-table-view-cell ' +
        (mCascader.currtId === item.id ? "active" : "") +
        '"><a class="mui-navigate-right" index=' +
        idx +
        ">" +
        item.name +
        "</a></li>";
    });

    $mcascaderList.empty().html(dom).show();
  }
  /**
   * 根据节点id递归查找对应的节点
   *
   * @param {mCascader数据} data
   * @param {节点id} id
   * @returns 对应节点||undefined
   */
  function getNodebyId(data, id) {
    for (idx in data) {
      if (data[idx].id === id) {
        defaultNodeName.push(data[idx].name);
        return { ...data[idx], defaultNodeName }; //不要影响源数据
      }
      defaultNodeName.push(data[idx].name);
      let res = data[idx].children && getNodebyId(data[idx].children, id);
      if (res) {
        return res;
      } else {
        defaultNodeName.pop(); //当前层找不到就舍弃上一路径
      }
    }
  }
  /**
   * 设置mCascader值
   * @param {节点} node
   */
  function setDefaultValue(node) {
    if (node) {
      $(mCascader.options.input)
        .data("id", node.id)
        .val(node.defaultNodeName.join(mCascader.options.separator));
      mCascader.currtId = node.id;
    }
  }

  /**
   * mCascader初始化函数
   * @param {配置项} options
   */
  window.mCascader = function (options) {
    let {
      input: selector, //css选择器
      data = [], //数据
      value = [], //默认值
      separator = "/", //分隔符
      onClick, //选择后的回调
    } = options;
    mCascader.options = options; //把配置项放入函数属性中
    let $input = $(selector);
    $mcascaderList = $("#mcascader > .mui-table-view");
    setDefaultValue(getNodebyId(data, value[0]));
    $input.click(function () {
      //当input点击则默认渲染第一层
      treeHistoryArr = [];
      currtTreeArr = data;
      renderTree(data, 0);
      treeHistoryArr.push(currtTreeArr); //放入历史

      mui("#mcascaderPopover").popover("show", $(selector)[0]);

      //事件代理列表项的点击
      $mcascaderList.off().on("click", ".mui-navigate-right", function () {
        let idx = $(this).attr("index");
        let $parentNode = $(this).parent();

        if (currtTreeArr[idx].id !== $input.data("id")) {
          let levelName = $input.val().split(separator);
          levelName[currtTreeArr[idx].level] = currtTreeArr[idx].name;
          levelName.splice(currtTreeArr[idx].level + 1);
          $input.val(levelName.join(separator)); //给选中的部门增加分隔符
          $input.data("id", currtTreeArr[idx].id);
          $parentNode.siblings().removeClass("active");
          $parentNode.addClass("active");
          mCascader.currtId = currtTreeArr[idx].id;
          onClick && onClick(currtTreeArr[idx]);
        }
        //开始渲染子节点
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
  mCascader.goBack = function () {
    //每次返回时把上一个历史树显示
    $mcascaderList.show();
    treeHistoryArr.pop();
    currtTreeArr = treeHistoryArr[treeHistoryArr.length - 1];
    renderTree(currtTreeArr);
  };
  //清空mCascader的数据，重置界面
  mCascader.clear = function () {
    treeHistoryArr = [];
    currtTreeArr = [];
    mCascader.currtId = "";
    $(this.options.input).data("id", "").val("");
    $mcascaderList.empty();
    mui("#mcascaderPopover").popover("hide");
  };

})();
