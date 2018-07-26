<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <div class="vas-picture-list-item">
                    <div class="vas-picture-list" @click="selectPicture">
                        <img v-bind:src="imgUrl" style="padding:10px; width:130px; height:130px">
                        <div class="list-checkbox"><input type="checkbox" checked="checked"></div>
                    </div>
                </div>
            </div>
            <div class="vas-history-item">
                <div>
                    <fileUpload></fileUpload>
                </div>
                <div v-bind:style="{'margin-top': '20px'}">
                    <fileUploadLabel></fileUploadLabel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import fileManageList from './FileManageList.vue';
  import fileUploadLabel from './FileUploadLabel.vue';
  import fileUpload from './FileUpload.vue'
  export default {
    name: "fileManage",
    data() {
      return {
        imgUrl: "static/img/test11.jpg",
        imgUrl1: "static/img/test1.png",
      };
    },
    components: {
      fileUploadLabel, fileManageList, fileUpload
    },
    created() {
        this.getListData();
    },
    computed: {},
    methods: {
        selectPicture() {

        },
        getListData(){
        }
    }
  };
</script>
