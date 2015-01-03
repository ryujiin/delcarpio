Loviz.Views.Carro = Backbone.View.extend({
	el:$('#contenido'),
	template : swig.compile($("#carro_template").html()),
	events :{
		'click .procesar':'go_procesar',
	},
	initialize: function () {
		var self = this;
	    this.listenTo(this.model, "change", this.verificar, this);
	},
	render:function () {
		var modelo = this.model.toJSON();
		var html = this.template(modelo);
	    this.$el.html(html);
	    this.addLineas();
	    this.addTotal();
	    this.$el.addClass('carro');	    
	    var num_lineas = new Loviz.Views.Num_lineas_carro({model:this.model});
	    this.crear_formulario();
		this.pagar=false;
	},
	verificar:function () {
		if (this.model.toJSON().lineas===0) {
			this.render();
		};
	},
	addLineas:function (pagar) {
		var lineas = this.model.toJSON().lineas;
		var self = this;
		if (pagar==='pagar') {
			this.pagar=true;
		};
		if (lineas > 0) {
			this.lineas_colecion = new Loviz.Collections.Lineas();
			this.lineas_colecion.fetch({
				data:$.param({carro:this.model.id})
			}).done(function () {
				self.lineas_colecion.forEach(self.addLinea,self);
			})
		};
	},
	addLinea:function (linea) {
		var viewLinea = new Loviz.Views.Linea_carro({model:linea});
		if (this.pagar===true) {
			viewLinea.template=swig.compile($("#comprar_resumen_linea_template").html());
		};
		this.$('#lineas_carro').append(viewLinea.render().el)
	},
	addTotal:function(pagar){
		var viewTotal = new Loviz.Views.Carro_total({model:this.model});
		if (pagar) {
			viewTotal.pagar=true;
			viewTotal.render();
		};
	},
	go_procesar:function () {
		window.routers.base.navigate('/comprar/', {trigger:true});
	},
	crear_formulario:function () {
		if (window.models.usuario.direcciones.length!=0) {
	    	this.formu_envio = new Loviz.Views.Formu_envio({
	    		model:window.models.usuario.direcciones.first()
	    	});
	    }else{
	    	this.formu_envio = new Loviz.Views.Formu_envio({
	    		model:new Loviz.Models.Direccion()
	    	});
	    }
	    this.formu_envio.render();
	    this.$('#formu_envio').append(this.formu_envio.$el);
	}
})
