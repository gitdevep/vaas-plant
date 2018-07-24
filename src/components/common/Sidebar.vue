<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
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
          icon: "el-icon-date",
          index: "3",
          title: "组件管理",
          subs: [
            {
              icon: "el-icon-tickets",
              index: "table",
              title: "基本表格"
            },
            {
              icon: "el-icon-tickets",
              index: "eltable",
              title: "表格"
            },
            {
              icon: "el-icon-message",
              index: "tabs",
              title: "tab选项卡"
            },
            {
              index: "form",
              title: "基本表单"
            },
            {
              index: "editor",
              title: "富文本编辑器"
            },
            {
              index: "markdown",
              title: "markdown编辑器"
            },
            {
              index: "upload",
              title: "文件上传"
            },
            {
              icon: "el-icon-star-on",
              index: "charts",
              title: "schart图表"
            },
            {
              icon: "el-icon-rank",
              index: "drag",
              title: "拖拽列表"
            },
            {
              icon: "el-icon-warning",
              index: "permission",
              title: "权限测试"
            },
            {
              icon: "el-icon-warning",
              index: "form_input",
              title: "测试表单"
            },
            {
              icon: "el-icon-error",
              index: "404",
              title: "404页面"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
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
