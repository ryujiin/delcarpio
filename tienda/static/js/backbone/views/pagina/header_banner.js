Loviz.Views.Header_banner = Backbone.View.extend({
	el:$('#banner_header'),
	
    template: swig.compile($("#bloque_limpio").html()),

	events: {
	},
	initialize : function () {
		var self = this;
		this.render();
		window.routers.base.on('route',function(e){
			self.aparecer(e);
		});
	},
	render:function () {
		var html = this.template();
        this.$el.html(html);
	},
	aparecer:function (e) {
		if (e==='carro'|| e==='producto_single' || e==='comprar' || e==='ingresar') {
			this.$el.hide();
		}else{
			this.$el.show();
			if (e!=='root') {
				this.$el.addClass('banner')
			}else{
				this.$el.removeClass('banner')
			}
		}
	}
});