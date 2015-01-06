Loviz.Views.Comprar_bloque = Backbone.View.extend({
	className:'col-md-4',
	template : swig.compile($("#comprar_bloque_template").html()),
	events :{
	},
	initialize: function () {
		var self = this;
	},
	render:function () {
		var model = {titulo:this.titulo};
		var html = this.template(model);
		this.$el.html(html);
		return this;
	},
});