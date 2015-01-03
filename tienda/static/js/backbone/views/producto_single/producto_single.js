Loviz.Views.Producto_single = Backbone.View.extend({
	el:$("#contenido"),
	events: {
		'click .thum_gale a' : 'nuevo_galeria',
		'click .addcart' : 'add_to_cart',
		'change .talla' : 'talla_seleccionada',
		'click .nav-tabs li' : 'tabs_navegacion',
		'click .reviews .escribe':'deslizarse_comentario',
	},
	template: swig.compile($("#producto_single_template").html()),

	initialize: function () {
	    var self = this;
	    this.listenTo(this.model, "change", this.render, this);
	},
	render: function () {
		this.num_relacionado = 0;
	    var producto = this.model.toJSON();
	    var html = this.template(producto);
	    this.$el.html(html);
	    this.generar_galeria();
	    this.add_comentarios();
	    this.crear_relacionados();
	    this.$el.removeClass();	    
	    this.$el.addClass('producto_single');
	},
	generar_galeria:function () {
		var galeria = new Loviz.Views.Galeria_producto_single({
			model:this.model
		});
	},
	aparecer:function (e) {
		if (e==='producto_single') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	add_to_cart:function () {
		var linea = new Loviz.Models.Linea();
		var produ = this.model.toJSON().id;
		var varia = this.$('.formulario_producto .talla').val();
		if (varia !=='') {
			var carro = window.models.carro.toJSON().id;
			if (carro ===undefined) {
				debugger;
				window.models.carro.save()
				.done(function (data) {
					debugger
					linea.set({carro:data.id,producto:produ,variacion:varia,cantidad:1});
					linea.save().done(function () {
						var miniline = new Loviz.Views.Linea_addcart({model:linea})
						window.models.carro.fetch().done(function (data) {
							debugger;
						})
					})	
				})
			}else{
				debugger;
				linea.set({carro:carro,producto:produ,variacion:varia,cantidad:1});
				linea.save().done(function () {
					var miniline = new Loviz.Views.Linea_addcart({model:linea})
					window.models.carro.fetch();
				})
			}
		}else{
			this.elige_talla();
		}
	},
	elige_talla:function () {
		this.$('.formulario_producto .talla').addClass('no_seleccionado');
	},
	talla_seleccionada:function () {
		this.$('.formulario_producto .talla').removeClass('no_seleccionado');
		this.$('.precios .visible').removeClass('visible');
		var varia = this.$('.formulario_producto .talla').val();
		this.$('.precios .'+varia).addClass('visible');
	},
	crear_relacionados:function () {
		var self = this;
		if (window.collections.productos.length===0) {
			window.collections.productos.fetch().done(function () {
				self.relacionados = window.collections.productos.shuffle();
			})
		}else{
			this.relacionados = window.collections.productos.shuffle();
		}
		this.relacionados.forEach(this.addRelacionados,this);
	},
	addRelacionados:function (produ) {
		var cate = this.model.toJSON().categoria;
		var estilo = this.model.toJSON().estilo;
		if (produ.toJSON().categoria === cate) {
			if (this.num_relacionado<5) {
				if (produ.id!=this.model.id) {
					var producto = new Loviz.Views.Producto({ model: produ });
					this.$('#relacionados').append(producto.render().el);	
					this.num_relacionado++
				};
			};			
		};		
	},
	add_comentarios:function () {
		var self = this;
		var coleccion = new Loviz.Collections.Comentarios();
		coleccion.fetch({
			data:$.param({producto:this.model.id})
		}).done(function () {
			self.add_estrellas(coleccion);
			self.view_comentarios = new Loviz.Views.Comentarios({collection:coleccion});
			self.$('#comentarios').append(self.view_comentarios.$el);
		})
	},
	add_estrellas:function (coleccion) {
		var num = coleccion.length;
		var valor = 0;
		coleccion.forEach(function (modelo) {
			valor = valor + modelo.toJSON().valoracion;
		});
		var promedio = parseFloat(valor/num).toFixed(1);
		var estrellas = Math.round(promedio);
		var model_estrella = new Loviz.Models.Estrellas();
		var view_estrella = new Loviz.Views.Estrellas({model:model_estrella});
		var estre_array = {};
		for (var i = 0; i < 5; i++) {
			if (estrellas>i) {
				estre_array['estrella'+i]=true;
			}else{
				estre_array['estrella'+i]=false;
			}
		};
		model_estrella.set({
			num_coment : num,
			valor_coment : valor ,
			estrellas : estre_array,
			promedio : promedio,
		});
		this.$(".reviews").append(view_estrella.$el);
	},
	tabs_navegacion:function (e) {
		var div =$(e.currentTarget.dataset.tabs);
		this.$('.nav-tabs li').removeClass('active');
		$(e.currentTarget).addClass('active');
		this.$('.tabs-seccion').hide();
		div.show();
	},
	deslizarse_comentario:function () {
		var id = '#comentarios';
        console.log('si');
        $('body,html').stop(true,true).animate({
            scrollTop:$(id).offset().top
        },1000);
        this.view_comentarios.mostrar_formulario();
	}
});