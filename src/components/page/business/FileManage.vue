<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <fileManageList @callback="modalCallback"></fileManageList>
            </div>
            <div class="vas-history-item">
                <div  class="vas-list-btn">
                    <div style="padding: 20px;">
                        <input type="button" name="danger"  class="btn" :id="btn[0].id"  :value="btn[0].value" @click="delAll">
                        <input type="button" name="primary" class="btn" :id="btn[1].id"  :value="btn[1].value" @click="share">
                        <input type="button" name="primary" class="btn" :id="btn[2].id"  :value="btn[2].value" @click="cancleShare">
                    </div>
                </div>
                <div>
                  <v-detail :detail="detail"></v-detail>
                </div>
                <div>
                    <v-share v-bind:shareData ="shareData"></v-share>
                </div>
            </div>
        </div>
        <div style="position: absolute; bottom: 60px; right:20px;">
            <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
        </div>        
    </div>
</template>

<script>
import fileManageList from "./FileManageList.vue";
import fileUploadLabel from "./FileUploadLabel.vue";
import fileUpload from "./FileUpload.vue";
import pagination from "../baseComponents/Pagination.vue";
import share from "../baseComponents/Share.vue";
import detail from "../baseComponents/Detail.vue";

export default {
  name: "fileManage",
  data() {
    return {
      total: 150, // 记录总条数
      display: 10, // 每页显示条数
      current: 1, // 当前的页数
      btn: [
        {
          id: "del",
          value: "删除"
        },
        {
          id: "share",
          value: "分享"
        },
        {
          id: "share_cancle",
          value: "取消分享"
        }
      ],
      detail: {
        title: "图片详情",
        value: [
          {
            name: "名称",
            value: "aaaaa"
          },
          {
            name: "来源",
            value: "私有云"
          },
          {
            name: "算法",
            value: "Base加密"
          }]
      },
      shareData: {
        btn: {
          title: "分享",
          id: "shareSave",
          value: "保存",
        }
      },
      selectPictureData: []
    };
  },
  components: {
    fileUploadLabel,
    fileManageList,
    fileUpload,
    "v-pagination": pagination,
    "v-share": share,
    "v-detail": detail
  },
  created() {},
  methods: {
    pagechange: function(currentPage) {
      console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    delAll() {
      if (this.selectPictureData.length === 0) {
        this.$message.showTips("warn", "请选择要删除的图片。");
      } else {
        this.$http.post().then(res => {
          if (res.data.success) {
            this.$message.showTips("success", "图片删除成功。");
          } else {
            this.$message.showTips(
              "success",
              "图片删除失败。原因：" + res.data.msg
            );
          }
        });
      }
    },
    share() {
      if (this.selectPictureData.length === 0) {
        this.$message.showTips("warn", "请选择要分享的图片。");
      } else {
        this.$http.post().then(res => {
          if (res.data.success) {
            this.$message.showTips("success", "图片分享成功。");
          } else {
            this.$message.showTips(
              "success",
              "图片分享失败。原因：" + res.data.msg
            );
          }
        });
      }
    },
    cancleShare() {
      if (this.selectPictureData.length === 0) {
        this.$message.showTips("warn", "请选择要取消分享的图片。");
      } else {
        this.$http.post().then(res => {
          if (res.data.success) {
            this.$message.showTips("success", "图片取消分享成功。");
          } else {
            this.$message.showTips(
              "success",
              "图片取消分享失败。原因：" + res.data.msg
            );
          }
        });
      }
    },
    modalCallback(data) {
      this.selectPictureData = JSON.parse(JSON.stringify(data));
      this.detail.selectPictureData = this.selectPictureData;
    }
  }
};
</script>
