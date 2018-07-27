<template>
    <div v-if="modal.showModal">
        <div class="md-modal md-effect-6" id="modal-6"  v-bind:style="{width: modal.width, height: modal.height}">
            <div class="md-content">
                <h3>{{modal.title}}</h3>
                <div>
                    <div>
                        <label>名称</label>
                        <input type="text" id="name" v-model="name"  value=''>
                    </div>
                    <div>
                        <label>被分享人</label>
                        <select v-model="modal.selectId">
                            <option v-for="(value, index) in modal.data" :key="index" :value="index">{{value.name}}</option>
                        </select>
                    </div>
                    <div class="btn-center">
                        <input type="button" name="primary" class="btn" :value="btn.save" @click="hidden">
                        <input type="button" name="danger"  class="btn" :value="btn.cancle" @click="hidden">
                    </div>
                </div>
            </div>
        </div>
        <div class="cover"></div>
    </div>   
</template>

<script>
export default {
    data() {
        return {
            name:"",
            btn:{
                save:'保存',
                cancle:'取消'
            },
            selectId:{}
        }
    },
    props:{
        modal:{
            type: Object,
            default: function (e) {
                return {
                    title:'弹框',
                    showModal:false
                }
            }
        }
    },
    methods:{
        hidden(){
            let selectValue = this.modal.data[this.modal.selectId];
            let param = {
                name:this.name,
                selectId:selectValue
            }
            this.$emit('callback', param);
        }
    }    
}
</script>
