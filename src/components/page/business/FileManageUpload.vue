<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <div class="vas-picture-list-item">
                    <div class="vas-picture-list" v-for="(value, index) in listData" :key="index">
                        <img v-bind:src="value.url" style="padding:10px; width:130px; height:130px">
                        <div class="list-checkbox"><input type="checkbox" v-model="value.checked" @change="selectPicture(value)"></div>
                    </div>
                </div>
            </div>
            <div class="vas-history-item">
                <div>
                    <fileUpload :uploadParam = 'uploadParam' @callback="callListBack"></fileUpload>
                </div>
                <div v-bind:style="{'margin-top': '20px'}">
                    <fileUploadLabel v-bind:selectData="selectLabel" @callback="callListBack"></fileUploadLabel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fileManageList from "./FileManageList.vue";
import fileUploadLabel from "./FileUploadLabel.vue";
import fileUpload from "./FileUpload.vue";
export default {
  name: "fileManage",
  data() {
    return {
      listData: [],
      selectData: [],
      selectLabel: {
        selectData: [],
        listData: []

      },
      uploadParam: {
        width:"95px",
        leftWidth: '0px',
        topWidth: '6px',
        select_file: "上传文件",
        selectPictureData: []
      }
    };
  },
  components: {
    fileUploadLabel,
    fileManageList,
    fileUpload
  },
  created() {
    this.getListData();
  },
  computed: {},
  methods: {
    callListBack(){
        this.getListData();
    },
    selectPicture(value) {
      if (value.checked) {
        //选中
        this.selectData.push(value.id);
      } else {
        let _index = 0;
         this.selectData.forEach((data, index) => {
          if (data === value.id) {
            _index = index;
          }
        });
        this.selectData.splice(_index, 1);
      }
      this.selectLabel.selectData = this.selectData;
    },
    getListData() {
      var param = {
        conditions: {},
        limit: null,
        loading: false,
        page: null,
        searchType: null,
        searchVal: null,
        searchType: "isNotLabel"
      };
      this.$http.post(this.$interfaceApi.FileManageList, param).then(res => {
          if (res.data.success) {
            this.listData = res.data.data.datas;
            this.listData.forEach((value, index) => {
              value.checked = true;
              this.selectData.push(value.id);
            });
            this.selectLabel.selectData = this.selectData;
            this.selectLabel.listData = this.listData;
          }
        }).catch(error => {
          console.log("获取没有达标的数据=========", error);
        });
    }
  }
};
</script>
