<template>
    <div>
        <div>
            <div  class="vas-list-btn">
                <div>
                    <div class="title">{{detail.title}}</div>
                </div>
                <div style="margin-left: 20px;color: #fff;line-height: 32px;font-size: 14px; text-align: left;">
                    <div v-for="(value, index) in detail.value" :key="index">
                        <span class="detail-info-title">{{value.name}}</span>
                        <span class="detail-info-value">{{value.value}}</span>
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
    }
  },
  props: {
      detail: {
          type: Object,
          default: function(e){
              return {
                  
              }
          }
      }
  }
};
</script>

