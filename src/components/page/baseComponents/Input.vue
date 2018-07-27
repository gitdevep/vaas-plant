<template>
    <div>
        <div>
           <label>{{inputData[0].name}}</label>
           <input v-model="inputData[0].value" id="name" name="name" type="text" value="" placeholder="请输入个人或公司账号">
         </div>
    </div>    
</template>

<script>
export default {
    name:"baseinput",
    data() {
        return {
            inputData: [{
                name: '姓名',
                value:""
            }]
        } 
    }
}
</script>

