<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <fileManageList></fileManageList>
            </div>
            <div class="vas-history-item">
                <div  class="vas-list-btn">
                    <div style="padding: 20px;">
                        <input type="button" name="danger"  class="btn" :id="btn[0].id"  :value="btn[0].value" @click="delAll">
                        <input type="button" name="primary" class="btn" :id="btn[1].id"  :value="btn[1].value" @click="share">
                        <input type="button" name="primary" class="btn" :id="btn[2].id"  :value="btn[2].value" @click="cancleShare">
                    </div>
                </div>
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
          btn:[{
              id: "del",
              value: "删除"
          },{
              id: "share",
              value: "分享"
          },{
              id: "share_cancle",
              value: "取消分享"
          }],
          detail:{
              title: "图片详情",
              name: {
                  name: "图片名称",
                  value: 'aaaaa'
              },
              source:{
                  name: "来源",
                  value: "私有云"
              } ,
              algorithm: {
                  name: "算法",
                  value: "Base加密"
              }

          }
       
      };
    },
    components: {
      fileUploadLabel, fileManageList, fileUpload
    },
    created() {
    },
    methods: {
        delAll() {

        },
        share() {

        },
        cancleShare() {

        }
    }
  };
</script>
