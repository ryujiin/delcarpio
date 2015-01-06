Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'carro/':'carro',
		'comprar/':'comprar',
		'ingresar/':'ingresar',
		'pagina/:slug/':'pagina',
		'user/:slug/':'usuario',
		'catalogo/':'catalogo',
		'catalogo/:slug/':'catalogo',
		'categoria/:slug/':'catalogo_categoria',
		'productos/:slug/':'catalogo_seccion',
		'producto/:slug/':'producto_single',
		'*notFound': 'notFound',
	},
	initialize : function () {
		this.collection_pagina=new Loviz.Collections.Paginas()
  	},
	root : function () {
		var self = this;
		var slug = 'home'
		var modelo = this.collection_pagina.findWhere({slug:slug})
		if (modelo===undefined) {
			window.models.pagina.fetch({
				data:$.param({slug:slug})
			}).done(function () {
				window.views.pagina.render();
			});	
		}else{
			window.views.pagina.render();
		}
		this.collection_pagina.add([window.models.pagina])
	},
	carro : function () {
		window.app.page = 'carro';
		window.views.carro.render()
	},
	pagina: function () {
	},
	comprar:function () {
		window.app.page = 'comprar'
		if (window.views.comprar===undefined) {
			window.views.comprar = new Loviz.Views.Comprar();
		}else{
			window.views.comprar.render();
		}
	},
	usuario : function () {		
	},
	ingresar:function () {
		window.views.usuario = new Loviz.Views.Usuario();
		window.views.usuario.titulo ='Identificarse o crear una cuenta';
		window.views.usuario.render();
		window.views.usuario.rellenar('ingresar');
	},
	catalogo : function (slug) {
		window.views.catalogo.render();
		window.views.catalogo.mostrar_productos(slug);
		window.views.catalogo.crear_filtro_categoria(slug);
		window.views.catalogo.crear_filtros(slug);
	},
	catalogo_categoria:function (slug) {
		window.views.catalogo.render();
		window.views.catalogo.mostrar_productos(slug);
		window.views.catalogo.crear_filtros(slug);
		//console.log('categoria '+ categoria)
	},
	catalogo_seccion:function (slug) {
		window.views.catalogo.render();
		window.views.catalogo.mostrar_productos(slug);
		window.views.catalogo.crear_filtros();	
	},
	producto_single : function (slug) {
		var modelo = new Loviz.Models.Producto_single();
		modelo.buscar(slug);
	},
	notFound:function () {
		console.log('no hay pagina')
	},
});