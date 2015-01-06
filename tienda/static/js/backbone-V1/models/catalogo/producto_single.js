Loviz.Models.Producto_single = Backbone.Model.extend({
	urlRoot : '/api/productoSingle/',
	buscar :function (slug) {
		var self = this;
		this.fetch({
			data:$.param({slug:slug})
		}).done(function (data) {
			window.models.producto_single.set(data);
		})
	}
});