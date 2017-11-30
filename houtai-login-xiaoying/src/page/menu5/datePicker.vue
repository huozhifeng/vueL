<template lang="html">
  <div class="date-picker">
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="css">
</style>
