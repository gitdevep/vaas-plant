<template>
    <div>
        <div>
            <div class="vas-picture-list-item">
                <div class="vas-picture-list" @click="selectPicture">
                    <img v-bind:src="imgUrl" style="padding:10px; width:130px; height:130px">
                </div>
            </div>
        </div>
         <div class="vas-picture-display">
            <img v-bind:src="imgUrl1" style="padding:20px;width:800px;height:800px">
        </div>
    </div>
</template>
<script>
  export default {
    name: "fileManageList",
    data() {
      return {
        imgUrl: "static/img/test11.jpg",
        imgUrl1: "static/img/test1.png",
        imgUrl2: ""
      };
    },
    created() {
        this.getListData();
    },
    methods: {
        selectPicture() {
           this.imgUrl2 = this.imgUrl1;
        },
        getListData(){
            this.imgUrl2 = this.imgUrl;
        }
    }
  };
</script>
