<template>
    <div v-if="modal.showModal">
        <div class="md-modal md-effect-6" id="modal-6"  v-bind:style="{width: modal.width, height: modal.height, color:'#fff'}">
            <div class="md-content">
                <h3>{{modal.title}}</h3>
                <div>
                    <div>
                        <span class="md-modal-content">名称</span>
                        <input type="text" id="name" v-model="name"  value=''>
                    </div>
                    <div>
                        <span class="md-modal-content">描述</span>
                        <input type="text" id="description" v-model="description"  value=''>
                    </div>
                    <div class="btn-center">
                        <input type="button" name="primary" class="btn" :value="btn.save" @click="hidden">
                        <input type="button" name="danger"  class="btn" :value="btn.cancle" @click="cancle">
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
            description: "",
            btn:{
                save:'保存',
                cancle:'取消'
            }
        }
    },
    props:{
        modal:{
            type: Object,
            default: function (e) {
                return {
                    title:'弹框',
                    showModal:false,
                    labelId: ""
                }
            }
        }
    },
    methods:{
        hidden() {
            let param = {
                param:{
                    dicName: this.name,
                    description: this.description,
                },
                labelId: this.modal.labelId
            }
            this.$emit('callback', param);
            this.name = "";
            this.description = "";
            this.modal.showModal = false;
        },
        cancle() {
            this.modal.showModal = false;
        }
    }    
}
</script>
