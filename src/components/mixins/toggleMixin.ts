export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMenu() {
      //@ts-ignore
      this.$emit('update:show', false)
    }
  },
  mounted() {}
  // ...
}
