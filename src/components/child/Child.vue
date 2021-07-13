<template>
  <div>
    <div class="child displayF justify-contentB">
      <div>
        <slot name='left'></slot>
      </div>
      <div>
        <slot name='center'></slot>
      </div>
      <div>
        <slot name='right'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.child {
  height: 40px;
}
</style>