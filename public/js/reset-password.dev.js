


;(function () {

	var $alert = Vue.$alert
	var app = new Vue({
		el: 'body'
		,data: {
			loaded: true
			,form1: null
			,formData1: {
				resetPassword: h5.resetPassword
			}
			,tab: 'info'
			,onSubmit1: false

		}
		,methods: {

			formHook: function(fm2) {
				this._form = fm2
			}
			,setPristine: function() {
				var pi = this
				Vue.nextTick(function() {
					pi._form.setPristine()
				})
			}
			,setDirty: function() {
				this._form.setDirty()
			}
			,pass: function() {
				var v = this.formData1.password
				return /^[0-9A-Za-z]{6,16}$/.test(v) &&
							 /[A-Za-z]/.test(v) &&
							 /[0-9]/.test(v)
			}
			,checkPass: function() {
				return this.formData1.password === this.formData1.password1
			}
			,update: function() {
				var pi = this
				if(pi.onSubmit1) return
				if(pi.form1.$invalid) return this.setDirty()
				pi.onSubmit1 = true
				$.ajax({
					type: 'post'
					,url: h5.host + '/api/user/reset-password'
					,data: pi.formData1
				})
				.then(function(res) {
					pi.onSubmit1 = false
					var data = res
					if(data.errorMsg || data.errs) {
						$alert(data.errorMsg || data.errs.join(';'), 'danger', '#msg2')
						
					} else {
						pi.formData1 = {}
						pi.setPristine()
						$alert('reset password done', 'success', '#msg2', 10000)
						setTimeout(function() {
							location.href = data.redirect || h5.host
						}, 3000)
					}
					
				}, function(res) {
					pi.onSubmit1 = false
					$alert('reset password failed', 'danger', '#msg2')
				})

				//end func
			}

			//end methods
		}

	})

})()