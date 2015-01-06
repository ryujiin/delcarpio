Loviz.Views.Bloque = Backbone.View.extend({
	className:'bloque',
	events :{
	},
	initialize: function () {
		var self = this;
		this.sacar_datos();
	},
	render:function () {
		var modelo = this.model.toJSON();		
		var html = this.template(modelo);
	    this.$el.html(html);
	    if (this.css!=='') {
	    	this.$el.addClass(this.css);
	    };
	    $(this.contenedor).append(this.$el)
	},
	sacar_datos:function () {
		var teme = this.model.toJSON().template;
		this.template = swig.compile($(teme).html());
		this.css = this.model.toJSON().css;
		this.contenedor = this.model.toJSON().seccion;
		this.render();
	}
})