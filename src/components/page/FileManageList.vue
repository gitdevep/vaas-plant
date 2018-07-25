<template>
    <div>
        <div>
            <div style="display:flex; flex-wrap:wrap">
                <div class="vas-picture-list" @click="selectPicture">
                    <img v-bind:src="imgUrl" style="padding:10px; width:130px; height:130px">
                    <div class="list-checkbox"><input type="checkbox" checked="checked"></div>
                </div>
                <div class="vas-picture-list" @click="selectPicture">
                    <img v-bind:src="imgUrl1" style="padding:10px; width:130px; height:130px">
                    <div class="list-checkbox"><input type="checkbox" checked="checked"></div>
                </div>

            </div>
        </div>

        <div style="margin:20px 20px 20px 20px; background:#000;height:100%">
            <img v-bind:src="imgUrl2" style="width:100%;">
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
