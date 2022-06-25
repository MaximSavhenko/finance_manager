export default {
  install: (app, options) => {
    console.log(options)

    app.config.globalProperties.$message = function (html) {
      window.M.toast({ html })
    }
    app.config.globalProperties.$error = function (html) {
      window.M.toast({ html: `[Ошибка]: ${html}` })
    }
  },
}
