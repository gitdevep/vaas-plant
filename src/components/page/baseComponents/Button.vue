<template>
    <div>
        <input type="button" :name="btn[0].name"  class="btn" :id="btn[0].id"  :value="btn[0].value">
    </div>
</template>

<script>
export default {
  name: "basebutton",
  data() {
    return {
      btn: [
        {
          id: "button",
          value: "按钮",
          name: "primary"
        }
      ]
    };
  },
  created() {},
  methods:{}
};
</script>
