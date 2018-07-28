<template>
                <div>
                    <div class="vas-list-btn" style="height:360px">
                        <div>
                            <div class="title">{{shareData.btn.title}}</div>
                        </div>
                        <div class="container-table">
                            <table class="form-table" cellpadding="0" cellspacing="0">

                                <thead class="fixed-thead">
                                  <tr>
                                    <th><input type="checkbox" v-model="selectAll" @change="allSelect"></th>
                                    <th>姓名</th>
                                  </tr>
                                </thead>

                                <tbody class="scroll-tbody" v-for="(value, index) in userInfo" :key="index">
                                  <tr>
                                    <td><input type="checkbox" v-model="value.checked" @change="selectFile(value)"></td>
                                    <td>{{value.name}}</td>
                                  </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="text-align: center;">
                          <input type="button" name="primary" class="btn" :id="shareData.btn.id"  :value="shareData.btn.value" @click="shareSave">
                        </div>
                    </div>
                </div>   
</template>

<script>
export default {
  data() {
    return {
      selectAll: false,
      selectUserData: [],
      userInfo: [
        {
          id: "0001",
          name: "张珊"
        },
        {
          id: "0002",
          name: "张珊"
        },
        {
          id: "0003",
          name: "张珊"
        },
        {
          id: "0004",
          name: "张珊"
        },
        {
          id: "0005",
          name: "张珊"
        }
      ]
    };
  },
  props: {
    shareData: {
      type: Object,
      default: function(e) {
        return {
          btn: {
            title: "分享",
            id: "shareSave",
            value: "保存"
          }
        };
      }
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {},
    selectFile(value) {
      if (value.checked) {
        this.selectUserData.push(value.id);
      } else {
        let _index = 0;
        this.selectUserData.forEach((data, index) => {
          if (data === value.id) {
            _index = index;
          }
        });
        this.selectUserData.splice(_index, 1);
      }
      console.log("this.selectUserData", this.selectUserData);
    },
    allSelect() {
      if (this.selectAll) {
        this.userInfo.forEach((value, index) => {
          value.checked = true;
          this.selectUserData.push(value.id);
        });
      } else {
        this.userInfo.forEach((value, index) => {
          value.checked = false;
        });
        this.selectUserData = [];
      }
    },
    shareSave() {
      console.log("this.selectUserData", this.selectUserData);
      if (this.selectUserData.length === 0) {
        this.$message.showTips("warn", "请选择要分享的用户。");
      } else {
      }
    }
  }
};
</script>
