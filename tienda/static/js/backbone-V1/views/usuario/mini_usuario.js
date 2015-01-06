Loviz.Views.Mini_usuario = Backbone.View.extend({
	el:$("#menu_top_usuario"),
	template: swig.compile($("#mini_usuario_template").html()),	
	events: {
	},
	initialize : function () {
	    this.listenTo(this.model, "change", this.render, this);
	},
	render:function () {
		var user = this.model.toJSON()
        var html = this.template(user);
        this.$el.html(html);
	}
})