<template>
    <div>
        <div>
            <div v-for="(value,index) in labels.labelData" :key="index">
                <label>{{value.name}}</label>
                    <select v-model='labels.labelDatas[index].value' @change="labelSelect(value, labels.labelDatas[index].value)">
                        <option v-for="(value, i) in value.value" :key="i" :value="value">{{value.name}}</option>
                </select>
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
        labelDatas:  [{
          parentId: "0",
          id: 123,
          name: "算法",
          nameEn: "suanfa",
          fileAttr: "1",
          isNeed: "1",
          dicCode: "11",
          value: [
            {
              id: "111qq",
              name: "2345"
            },
            {
              id: "112www",
              name: "23456777"
            }
          ]
        },
        {
          parentId: "0",
          id: 124,
          name: "行业",
          nameEn: "hangye",
          fileAttr: "1",
          isNeed: "1",
          dicCode: "12",
          value: [
            {
              id: "111",
              name: "2345rererre"
            },
            {
              id: "112",
              name: "23456777werewrew"
            }
          ]
        }],
        labelData:  [{
          parentId: "0",
          id: 123,
          name: "算法",
          nameEn: "suanfa",
          fileAttr: "1",
          isNeed: "1",
          dicCode: "11",
          value: [
            {
              id: "111qq",
              name: "2345"
            },
            {
              id: "112www",
              name: "23456777"
            }
          ]
        },
        {
          parentId: "0",
          id: 124,
          name: "行业",
          nameEn: "hangye",
          fileAttr: "1",
          isNeed: "1",
          dicCode: "12",
          value: [
            {
              id: "111",
              name: "2345rererre"
            },
            {
              id: "112",
              name: "23456777werewrew"
            }
          ]
        }]
      }
    };
  },
  created() {
    this.getLabelData();
  },
  methods: {
    // labels选择事件
    labelSelect(labels, selectId) {},
    // 获取标签数据
    getLabelData() {
      // api地址
      let url = "../../static/labelData.json";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success) {
            this.labels.labelData = res.data.data;
            this.labels.labelDatas = JSON.parse(
              JSON.stringify(this.labels.labelData)
            );
          }
        })
        .catch(error => {});
    }
  }
};
</script>
