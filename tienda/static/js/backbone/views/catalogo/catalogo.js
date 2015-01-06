Loviz.Views.Catalogo = Backbone.View.extend({
	className: 'cotenedor',
	el:$('#contenido'),
	
    template: swig.compile($("#catalogo_template").html()),

	events: {
		'click .bloque_filtro input':'mostrar_clear_filtro',
		'click .clear_filtros':'borrar_filtros',
	},
	initialize : function () {
		var self = this;
		this.listenTo(window.collections.catalogo, "add", this.addOne, this);
	},
	render:function () {
		var html = this.template();
        this.$el.html(html);
	},
	addOne: function (produ) {
		var producto = new Loviz.Views.Producto({ model: produ });
		this.$('.productos').append(producto.render().el);
		producto.$el.addClass('col-md-4');
	},
});