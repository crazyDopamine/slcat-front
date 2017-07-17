<template>
  <div class="page-container">
task
  </div>
</template>
<script>
  import formValidate from '../../common/formValidate'
  export default {
    mixins:[formValidate],
    data: function () {
      return {
      }
    },
    methods: {
      submit: function () {
      }
    },
    created: function () {
      this.validateInit()
    }
  }
</script>
