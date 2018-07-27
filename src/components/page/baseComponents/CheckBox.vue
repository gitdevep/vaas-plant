<template>
    <div>
        <div>
            <input type="checkbox" v-model="checkbox">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checkbox: true
        }
    }
}
</script>