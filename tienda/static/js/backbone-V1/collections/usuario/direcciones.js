Loviz.Collections.Direcciones = Backbone.Collection.extend({
	model : Loviz.Models.Direccion,
	url: '/api/cliente/direcciones/',
	initialize : function () {
		this.fetch();
  	},
});