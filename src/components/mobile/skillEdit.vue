<template>
  <div class="page-container">
    <div class="container">
      <div class="text-center fs-xxl">擅长技能</div>
      <div class="skill-edit-container">
        <label class="fc-theme">策划</label><br/>
        <ul class="gray-border-icons margin-top-10 margin-bottom-10">
          <li>平面设计</li>
          <li>Photoshop</li>
          <li>illusrator</li>
          <li>VI设计</li>
        </ul>
      </div>
      <div class="btn-area">
        <a class="btn btn-theme-round btn-harf">保存</a>
        <a class="btn btn-gray-d-round btn-harf" @click="$router.go(-1)">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data: function () {
      return {}
    },
    methods: {},
    created: function () {

    }
  }
</script>
