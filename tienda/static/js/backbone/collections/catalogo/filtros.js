Loviz.Collections.Filtros = Backbone.Collection.extend({
	model : Loviz.Models.Filtro,
	name : 'Caja Filtro',
	url : function () {
		if (this.filtro==='Colores') {
			return '/api/filtro/colores/'
		}else if(this.filtro==='Estilos'){
			return '/api/filtro/estilos/'
		}else if(this.filtro==='Tallas'){
			return '/api/filtro/tallas/'
		}
	}
});