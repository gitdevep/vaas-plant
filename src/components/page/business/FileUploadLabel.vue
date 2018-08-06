<template>
    <div v-show="selectData.listData.length>0">
        <div class="vas-picture-display">
            <div>
                <div class="title">{{labels.title}}</div>
            </div>
            <div class="content-common">
                <div v-for="(value,index) in labels.labelData" :key="index">
                        <span class="label-list-info">{{value.name}}</span>
                        <select v-model='labels.labelDatas[index]' @change="labelSelect(value, labels.labelDatas[index])">
                            <option v-for="(value, i) in value.dicList" :key="i" :value="value">{{value.dicName}}</option>
                        </select>
                        <a @click="addLabel(value)" class="add-label">新增</a>
                    </div>
                <div style="margin-left: 95px;">
                    <input type="button" name="primary" class="btn" :value="labels.btn_value" @click="labelSave">
                </div>
            </div>
        </div>
        <v-modal :modal="modal" @callback = "addLabelback"></v-modal>
    </div>
</template>

<script>
import modal from "../baseComponents/Modal.vue";
export default {
  name: "fileUploadLabel",
  data() {
    return {
      labels: {
        title: "标签列表",
        btn_value: "保存",
        labelDatas: [],
        labelData: [],
        selectLabelData: {},
        addLabelData: {}
      },
      modal: {
        title:'增加标签',
        showModal:false,
        labelId: ""
      }
    };
  },
  props: {
    selectData: {
      type: Object,
       default: function (e){
        return {

        }
      }
    }
  },
  components: {
    "v-modal":modal
  },
  created() {
    this.getLabelData();
  },
  methods: {
    addLabel(value) {
      this.modal.showModal = true;
      let parentData = this.labels.labelData.filter((v,k)=>{
          return v.id === value.parentId;
      })
      if(parentData && parentData.length>0){
        this.modal.labelId = this.labels.addLabelData[parentData[0].dicCode];
      }else {
         this.modal.labelId = value.dicCode;
      }
    },
    addLabelback(value) {
      this.$http.post(this.$interfaceApi.AddDic + value.labelId, value.param).then((res) => {
        if(res.data.success){
          this.getLabelData();
        }
      })
    },
    // labels选择事件
    labelSelect(labels, selectId) {
      let id = labels.id;
      let parentId = labels.parentId;
      let deviceType = selectId ? selectId.id : "" ;
      this.labels.selectLabelData[id] = selectId.id;
      this.labels.addLabelData[labels.dicCode] = selectId.id;
      if (labels.isClick) {
        //不同的设备类型调用接口，获取不同的来源
        this.$http.get(this.$interfaceApi.GetSingalLabel + deviceType).then(res => {
            if (res.data.success) {
              this.labels.labelData.forEach((value, index) => {
                if (value.parentId === id) {
                  value.dicList = res.data.data;
                }
              });
              this.labels.labelDatas.forEach((value, index) => {
                if (value.parentId === id) {
                  value.dicList = res.data.data;
                }
              });
            }
          }).catch(error => {
            console.log("===根据设备类型获取来源===", error);
          });
      }
    },
    // 保存
    labelSave() {
      if(this.selectData.selectData.length===0){
        this.$message.showTips("warn","请选择需要打标签的图片。");
      };
      let labelKey = [];
      let labelValue = [];
      for(let key in this.labels.selectLabelData){
        console.log("key=======",key,this.labels.selectLabelData)
        labelKey.push(key);
        labelValue.push(this.labels.selectLabelData[key]);
      }
      var prama = {
        "fileId": this.selectData.selectData.join(","),
        "labId": labelKey.join(","),
        "labVal": labelValue.join(",")
      };
      this.$http.post(this.$interfaceApi.SaveFileLabel, prama).then(res => {
          if(res.data.success){
            this.$message.showTips("success", "标签保存成功。");
          }else {
            this.$message.showTips("error", res.data.msg);
          }
          this.getLabelData();
          this.$emit("callback");
        }).catch(error => {
         this.$message.showTips("error", error);
        });
    },
    // 获取标签数据
    getLabelData() {
      this.$http.get(this.$interfaceApi.FileManageLabel).then(res => {
          if (res.data.success) {
            let listData = res.data.data;
            listData.forEach((v,k) =>{
              listData.forEach((m,n) =>{
                if(v.id===m.parentId){
                  v.isClick = true;
                }
              })
            })
            listData.sort((a,b)=>{
              let value1=  Number(a.px);
              let value2 = Number(b.px);
              return value1-value2;
            })
            this.labels.labelData = listData;
            this.labels.labelDatas = JSON.parse(JSON.stringify(this.labels.labelData));
          }
        }).catch(error => {
          console.log("===获取标签数据===", error);
        });
    }
  }
};
</script>
