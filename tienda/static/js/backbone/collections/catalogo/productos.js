Loviz.Collections.Productos = Backbone.Collection.extend({
	model : Loviz.Models.Producto,
	url : '/api/catalogo/',
	
	initialize:function () {
		this.buscar_productos();
	},
	buscar_productos:function () {
		if (window.app.catalogo.genero===undefined) {
			this.fetch();
		}else{
			this.fetch({
				data:$.param({genero:window.app.catalogo.genero,enrique:'enn'})
			});
		}
	}
});