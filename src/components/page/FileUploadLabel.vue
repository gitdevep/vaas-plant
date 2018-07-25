<template>
    <div>
        <div class="vas-picture-display">
            <div>
                <div class="title">{{labels.title}}</div>
            </div>
            <div class="content-common">
                <div v-for="(value,index) in labels.labelData" :key="index">
                        <label>{{value.name}}</label>
                        <select v-model='labels.labelDatas[index].value' @change="labelSelect(value, labels.labelDatas[index].value)">
                            <option v-for="(value, i) in value.value" :key="i" :value="value">{{value.name}}</option>
                        </select>
                    </div>
                <div class="btn-center">
                    <input type="button" name="primary" class="btn" :value="labels.btn_value" @click="labelSave">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "fileUploadLabel",
  data() {
    return {
      labels: {
        title: "文件列表",
        btn_value: "保存",
        labelDatas: [],
        labelData: []
      }
    };
  },
  created() {
    this.getLabelData();
  },
  methods: {
    // labels选择事件
    labelSelect(labels, selectId) {
      console.log("1111111111111111", labels.id, selectId.id);
    },
    // 保存
    labelSave() {
      console.log("originValue", this.originValue);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data" // 以表单传数据的格式来传递fromdata
        }
      };
      this.$http
        .post("/url/upload", this.formData, config)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取标签数据
    getLabelData() {
      // api地址
      console.log("document", document.cookie);
      let url = "./static/labelData.json";
      this.$http.get(url).then(res => {
          if (res.data.success) {
              this.labels.labelData = res.data.data;
              this.labels.labelDatas = JSON.parse(JSON.stringify(this.labels.labelData));
          }
        }).catch(error => {
          console.log("error=========", error);
        });
    }
  }
};
</script>
