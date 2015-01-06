Loviz.Views.Categoria_filtros = Backbone.View.extend({
    className: 'bloque',
    events: {
    },
    template: swig.compile($("#filtro_template").html()),
    
    initialize: function () {
        // this.listenTo(this.collection, "add", this.add_filtro, this);
    },
    render: function () {
        var json_filtro = {'titulo': 'Categorias'}
        var html = this.template(json_filtro);
        this.$el.html(html);
        this.addFiltros();
    },
    add_filtro:function (filtro) {
        filtro.set('categoria',true);        
        var link = new Loviz.Views.Filtro_link({ model: filtro });
        //window.views.catalogo.filtros_link.push(link);
        this.$('.filtros').append(link.render().el);
    },
    addFiltros:function () {
        var colecion = this.collection.where({genero_slug:this.genero});
        colecion.forEach(this.add_filtro,this);
    }
});