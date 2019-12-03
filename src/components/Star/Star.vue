<script>
export default {
  name: 'Star',
  render: function (createElement) {
    let activeNumber = parseInt(this.starNumber)
    return createElement(
      'div',
      {
        class: 'info_starRate clearFix'
      },
      [
        ...Array.apply(null, { length: activeNumber }).map(() => {
          return createElement('i', { class: 'info_star' })
        }),
        ...Array.apply(null, { length: 5 - activeNumber }).map(() => {
          return createElement('i', { class: 'info_star info_star--inactive' })
        })
      ]
    )
  },
  props: {
    starNumber: Number
  }
}
</script>

<style lang="scss" scoped>
  .clearFix {
    *zoom: 1;
  }
  .clearFix:after {
    content: '';
    display: block;
    clear: both;
  }
  .info_star {
    float: left;
    width: 12px;
    height: 12px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAABICAMAAADbJ8U9AAAAmVBMVEUAAADl5eX/1lX/1FX/1Vb/2VXn5+fm5ubq5tz/11bl5eXl5eX/1VXm5ubn5+f/1V//1FT/1FX/1lXl5eXl5eX/2Fbq6urk5OTk5OT/1VT/1lX/1FXl5eX/11Tl5eXl5eXl5eX/1VT/1VTl5eX/1Vbm5ub/01j/1VTl5eX/1Vfl5eX/1lTk5OTl5eX33Z7/1VXk5OT/1FT13J3Q9qRrAAAAMHRSTlMAvpb7aDg5bR8f85pyZ0IX9L23k1lBF/rk5MChoIeGdGBgW05OKCjsxVXsxbV+fn5ImA76AAABIklEQVQ4y9WSyXLCMBBEJRmMjRdwjM2+L9mTGf//x0UpyIAmo4ILB/qicr9q66Cn7pNvT9/GSgZPWHgGiG15gFjIAz457FJTjPGY8cSku8MRtJCndZqs5d5mE1z2a3XO65kEG2rde1J1GzAEjAsmBN5d8IzYn8fzvj2cvoeB6f2eJsD4ElTTv894WqkHyZfPqyb3eNVoj1cNhOLAAi0OLIBQ9MoCGOlkud2zZ23glA555YLM9YrAyvWKwMDVh0BH3QYMgYR5ReBF8mrRBeiKXtXlECLZq2iWqwfJp6cPIZeBBu0ZgOzVhwVaHvDJfrtM9AhsmFcZUJhXK2q4VwOgkFeccK8y9v/roCTAvNIEmFdvVqhF9N+rGoZlLXmVz6I7evUDNbpOpWFLPZYAAAAASUVORK5CYII=") 40% 5.66%/126% 379% no-repeat;
  }
  .info_star--inactive {
    background-position: 40% 96.226% !important;
  }
</style>
