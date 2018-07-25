<template>
    <div>
        <div class="container">
            <div class="vas-picture-item">
                <fileManageList></fileManageList>
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
       
      };
    },
    components: {
      fileUploadLabel, fileManageList, fileUpload
    },
    created() {},
    computed: {},
    methods: {
    }
  };
</script>
