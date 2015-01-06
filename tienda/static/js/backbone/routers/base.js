Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'carro/':'carro',
		'comprar/':'comprar',
		'catalogo/':'catalogo',		
		'catalogo/:genero/':'catalogo',
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		var self = this;
	},
	carro : function () {
		window.app.page = 'carro';
		window.views.carro.render()
	},
	catalogo:function (genero) {
		window.app.page = 'catalogo'
		window.app.catalogo = {};
		window.app.catalogo.genero = genero;

		window.collections.catalogo = new Loviz.Collections.Productos();
		if (window.views.catalogo === undefined) {
			window.views.catalogo = new Loviz.Views.Catalogo();
		};
		window.views.catalogo.collection = window.collections.catalogo;
		window.views.catalogo.render();
	},
	notFound:function () {
		console.log('no hay pagina')
	},
});