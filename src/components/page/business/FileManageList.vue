<template>
    <div>
        <div>
            <div class="vas-picture-list-item">
                <div class="vas-picture-list" v-for="(value, index) in dataList" :key="index"  @click.stop="selectPicture(value.id)">
                    <img v-bind:src="value.url" style="padding:10px; width:130px; height:130px">
                    <div class="list-checkbox">
                        <input type="checkbox" v-model="value.checked" @click.stop="selectFile(value)">
                    </div>
                </div>
            </div>
        </div>
         <div class="vas-picture-display">
             <div id="box">
                <img id='myimage' v-bind:src="imgUrl" style="padding:20px;width:600px;height:600px; cursor:pointer">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "fileManageList",
  data() {
    return {
      imgUrl: "", //放大的图片
      dataList: [], //列表数据
      selectData: []
    };
  },
  created() {
    this.getListData();
  },
  mounted() {
      //实现图片的滚动放大缩小
      this.$message.bigimg();
  },
  methods: {
    // 用于点击小图片显示大图片
    selectPicture(id) {
      let data = this.dataList.filter((value, index) => {
        return value.id === id;
      });
      if (data.length > 0) {
        this.imgUrl = data[0].url;
      }
    },
    // 复选框的选择事件
    selectFile(value) {
      setTimeout(() => {
        //解决checkbox的click事件获取值相反问题
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
        this.$emit("callback", this.selectData);
      }, 0);
    },
    getListData() {
      this.dataList = [
        {
          id: "111111111",
          url: "static/img/test11.jpg"
        },
        {
          id: "111111112",
          url: "static/img/test1.png"
        },
        {
          id: "111111113",
          url: "static/img/test11.jpg"
        }
      ];
      this.imgUrl = this.dataList[0].url;
    }
  }
};
</script>
