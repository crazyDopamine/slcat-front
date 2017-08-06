<template>
  <div class="page-container no-bar-container">
    <div class="container">
      <div class="text-center fs-xxl">擅长技能</div>
      <div class="skill-edit-container margin-bottom-20" v-for="(skills,key) in skillMap">
        <label class="fc-theme fs-xl">{{key}}</label><br/>
        <ul class="gray-border-icons margin-top-10 margin-bottom-10">
          <li v-for="data in skills" class="fs-l" :class="selected[data.id]?'selected':''"
              @click="selectSkill(data.id)">
            {{data.skillName}}
          </li>
        </ul>
      </div>
      <!--<div class="form-area" style="padding:0;">-->
        <!--<div class="form-row">-->
          <!--<label>其他技能（多个技能请用","隔开）</label><br/>-->
          <!--<div class="form-field">-->
            <!--<input type="text" v-model="skillText"/>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="btn-area margin-top-20">
        <a class="btn btn-theme-round btn-harf" @click="submit()">保存</a>
        <a class="btn btn-gray-d-round btn-harf" @click="$router.go(-1)">取消</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {each} from '../../common/utils'
  export default{
    data: function () {
      return {
        skillList: [],
        skillMap: {},
        selected: {},
        skillText:''
      }
    },
    methods: {
      refresh: function () {
        this.$http.get(this.url('/skill/getSkillInfo')).then(this.rspHandler((data) => {
          this.skillList = data;
          this.skillMap = {}
          data.each((item, index) => {
            if (!this.skillMap[item.skillType]) {
              this.skillMap[item.skillType] = []
            }
            this.skillMap[item.skillType].push(item)
          })
          this.userInfo.baseSkillList.each((item, index) => {
          	this.$set(this.selected,item.id,true)
          })
        }))
      },
      selectSkill: function (id) {
        this.$set(this.selected, id, !this.selected[id])
      },
      submit: function () {
        var params = {skills: []}
        each(this.selected, (value, key) => {
          if (value) {
            params.skills.push(key)
          }
        })
        this.$vux.loading.show({
          text: '正在提交'
        })
        this.$http.post(this.url('techMaster/update'), params).then(this.rspHandler((data) => {
          window.vm.getUserInfo()
          this.$vux.loading.hide()
          this.$vux.toast.text('修改成功', 'bottom');
          this.$router.push('/userInfo')
        }))
      }
    },
    created: function () {
      this.$on(this.consts.loadedEvent, function () {
        this.refresh();
      })
    }
  }
</script>
