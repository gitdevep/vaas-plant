<template>
    <div>
        <div v-bind:style="{'margin-top': '20px'}">
            <div  class="vas-list-btn">
                <div>
                    <div class="title">{{detail.title}}</div>
                </div>
                <div class="content-common">
                    <div class="vas-detal">
                        <label>{{detail.name.name}}</label>
                        <label>{{detail.name.value}}</label>
                    </div>
                    <div>
                        <label>{{detail.source.name}}</label>
                        <label>{{detail.source.value}}</label>
                    </div>
                    <div>
                        <label>{{detail.algorithm.name}}</label>
                        <label>{{detail.algorithm.value}}</label>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        title: "图片详情",
        name: {
          name: "图片名称",
          value: "aaaaa"
        },
        source: {
          name: "来源",
          value: "私有云"
        },
        algorithm: {
          name: "算法",
          value: "Base加密"
        }
      }
    };
  }
};
</script>

