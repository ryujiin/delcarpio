Loviz.Views.Usuario = Backbone.View.extend({
	el:$('#contenido'),
	template : swig.compile($("#pagina_template").html()),
	events :{
	},
	initialize: function () {
		var self = this;
	},
	render:function () {
		var modelo= {titulo:this.titulo}
		var html = this.template(modelo);
	    this.$el.html(html);
	},
	rellenar:function (slug) {
		if (slug==='ingresar') {
			this.login=new Loviz.Views.Login();
			this.$('#bloques_extras').append(this.login.render().el)
			this.login.$el.addClass('col-md-6')
			this.crear = new Loviz.Views.Crear_cuenta();
			this.$('#bloques_extras').append(this.crear.render().el)
			this.crear.$el.addClass('col-md-6')
		};
	}
})