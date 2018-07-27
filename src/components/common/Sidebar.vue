<template>
    <div class="side-bar">
        <div style="margin-top:14px; cursor:pointer; color:#409EFF">
            <ul  v-for="item in items" :index="item.index" :key="item.index">
                <li @click="goRoute(item.index)">{{item.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-document",
          index: "filemanage",
          title: "文件管理"
        },
        {
          icon: "el-icon-document",
          index: "fileupload",
          title: "文件上传"
        },
        {
          icon: "el-icon-document",
          index: "pagination",
          title: "分页"
        },
        {
          icon: "el-icon-document",
          index: "button",
          title: "按钮"
        },
        {
          icon: "el-icon-document",
          index: "modal",
          title: "弹框"
        },
        {
          icon: "el-icon-document",
          index: "input",
          title: "输入框"
        },
        {
          icon: "el-icon-document",
          index: "checkbox",
          title: "复选框"
        },
        {
          icon: "el-icon-document",
          index: "select",
          title: "选择框"
        },
        {
          icon: "el-icon-document",
          index: "table",
          title: "基础表格"
        },
        {
          icon: "el-icon-document",
          index: "uploadcomponent",
          title: "上传组件"
        },
        {
          icon: "el-icon-document",
          index: "detail",
          title: "详情组件"
        }
      ]
    };
  },
  computed: {
  },
  methods:{
      goRoute(path) {
          this.$router.push({ path: path})
      }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
