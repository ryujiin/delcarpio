Loviz.Views.Crear_cuenta = Backbone.View.extend({
    tagName: 'bloque',
    events: {
        'click .aparecer':'aparecer',
    },
    template: swig.compile($("#usuario_crear_bloque_template").html()),
    
    initialize: function () {
        
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);
        this.$('.formulario').hide();
        return this;
    },
    aparecer:function () {
        this.$('.formulario').slideDown();
        this.$('.aparecer').hide();
    }
});