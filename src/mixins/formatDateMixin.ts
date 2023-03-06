export default {
  methods: {
    formatDate(dateString: any) {
      const date = new Date(dateString)
      // @ts-ignore
      return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date)
    }
  }
}
