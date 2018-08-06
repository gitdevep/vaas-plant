<template>
    <div v-show="showDetail">
        <div class="vas-list-btn" style="min-height:320px">
            <div>
                <div class="title">详情
                </div>
                <div style="text-align: right; margin-right:20px;">
                    <input type="button" name="primary" class="btn" :class="{active: activeName == btn[0].id}" :id="btn[0].id"  :value="btn[0].value" @click="cancleShare">
                </div>
            </div>
            <div class="container-table" style="height: 220px; overflow: auto;">
                <div style="color: #fff; margin-bottom:10px;" >算法信息</div>
                    <table class="form-table" cellpadding="0" cellspacing="0">
                        <tbody class="scroll-tbody" v-for="(value, index) in fileLabelList" :key="index">
                            <tr>
                                <td :title="value.name">{{value.name}}</td>
                                <td :title="value.value">{{value.value}}</td>
                            </tr>
                        </tbody>
                    </table>
                <div style="color: #fff; margin-top:10px; margin-bottom:10px;">用户信息
                </div>
                    <table class="form-table" cellpadding="0" cellspacing="0">
                        <tbody class="scroll-tbody" v-for="(value, index) in fileUserList" :key="index">
                            <tr>
                                <td :title="value.name">{{value.name}}</td>
                                <td :title="value.value">{{value.value}}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div> 
</template>

<script>
import bus from "../../common/bus";
export default {
  data() {
    return {
      btn: [{
          id: "share_cancle",
          value: "取消分享"
        }],
      activeName:"",
      showDetail: false,
      fileLabelList: [],
      fileUserList: [],
      fileId: "",
    };
  },
  mounted() {
    bus.$on("detailInfo", value => {
      this.fileLabelList = [];
      this.fileUserList = [];
      this.fileId = value.fileId;
      if (value.fileLabelList && value.fileLabelList !== null) {
        value.fileLabelList.forEach((v, k) => {
          let map = {
            name: v.labelDefineName,
            value: v.dicName
          };
          this.fileLabelList.push(map);
        });
      }
      if (value.fileUserList && value.fileUserList !== null) {
        value.fileUserList.forEach((v, k) => {
          let map = {
            name: "用户Id",
            value: v.userId
          };
          this.fileUserList.push(map);
        });
      }
      if (this.fileUserList.length === 0 && this.fileLabelList.length === 0) {
        this.showDetail = false;
      } else {
        this.showDetail = true;
      }
    });
  },
  methods: {
      cancleShare() {
          bus.$emit("cancleFileShare",{fileId: this.fileId})
      }
  }
};
</script>

