Loviz.Views.Carrusel = Backbone.View.extend({
	events :{
	},
	initialize: function () {
		var self = this;
		this.sacar_datos();
	},
	render:function () {
		var css = this.model.toJSON().css;
		var contenedor = this.model.toJSON().seccion;
		var modelo = this.model.toJSON();		
		var html = this.template(modelo);
	    this.$el.html(html);
	    this.$el.addClass(css);
	    $(contenedor).append(this.$el)
	    this.llenar_carrusel();
	},
	sacar_datos:function () {
		var teme = this.model.toJSON().template;
		this.template = swig.compile($(teme).html());
		this.render();
	},
	llenar_carrusel:function () {
		this.num_carrusel = 0;
		var self = this;
		var coleccion;
		var modelo = this.model.toJSON().modelo;
		var filtro = this.model.toJSON().filtro1; 
		if (modelo == 'Producto') {
			coleccion = window.collections.productos
			if (filtro!=='') {
				if (filtro==='oferta') {
					coleccion = coleccion.where({en_oferta:true})
				};
			}
			coleccion.forEach(this.addproducto,this);
			this.poner_carrusel();
		}else if(modelo=="Comentario"){
			coleccion = new Loviz.Collections.Comentarios()
			coleccion.fetch().done(function () {
				coleccion.forEach(self.addComentario,self);
				self.poner_carrusel();
			});
		}
		
	},
	addproducto:function (produ) {
		if (this.num_carrusel<6) {
			var producto = new Loviz.Views.Producto({ model: produ });
			this.$('.lista').append(producto.render().el);
			this.num_carrusel++
		};
	},
	poner_carrusel:function () {
		var num_items = this.model.toJSON().items_mostrar
		num_items = parseInt(num_items)
		this.$('.lista').owlCarousel({
			items:num_items,
		});
	},
	addComentario:function (coment) {
		if (this.num_carrusel<4) {
			var comentario = new Loviz.Views.Comentario_lista({model:coment});
			this.$('.lista').append(comentario.render().el);			
			this.num_carrusel++
		};
	}
})