Loviz.Views.Body = Backbone.View.extend({
	events: {
		'click .link' : 'linknormal',
		'click .logo' : 'navega_home',
		'blur .requerido':'verificar_input_requerido',
		'blur input[type=password]':'verificar_pass',
		'blur input[type=email]':'verificar_email',
		'click .login_face' : 'login_face',
		'click .link':'link_intero',
	},
	initialize : function ($el) {
		var self = this;
		this.$el = $el;
		this.cargar_bloques();
		this.cargar_menus();
	},
	link_intero:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});
	},
	obt_galleta : function(){
		var galleta = $.cookie('carrito');
		if (galleta==null) {
			console.log('veamos');
			var session = getRandomChar();
			$.cookie('carrito',session,{ expires: 1, path: '/'});
			galleta = session;
		};
		function getRandomChar() {
			numCara = 50
			chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			pass ='';
			for (i=0;i<numCara;i++) {
				x = Math.floor(Math.random()*62);
				pass+=chars.charAt(x);
			};
			return pass
		};
		return galleta
	},
	verificar_input_requerido:function (e) {
		var div = $(e.currentTarget);
		var valor = div.val();
		var texto_ayuda;
		if (valor ==='') {
			texto_ayuda = '<span class="icon-cross2">Este campo es obligatorio*'
			this.inputError(div,texto_ayuda);
		}
	},
	verificar_pass:function (e) {
		var div = $(e.currentTarget);
		var valor = div.val();
		var texto_ayuda;
		var lonitud = valor.length;
		if (valor!=='') {
			if (lonitud<5) {
				texto_ayuda = '<span class="icon-cross2">La contraseña no puede ser menor de 5 caracteres'
				this.inputError(div,texto_ayuda)
				div.val('');
			}else{
				div.addClass('bueno')
				div.next().empty();	
			}
		};
	},
	verificar_email:function (e) {
		var div = $(e.currentTarget);
		var valor = div.val();
		var texto_ayuda;
		var email = this.validarEmail(valor)
		if (valor!=='') {
			if (email===false) {
				texto_ayuda = '<span class="icon-cross2">Porfavor ingrese un Correo Valido'
				this.inputError(div,texto_ayuda)
				div.val('');
			}else{
				div.addClass('bueno')
				div.next().empty();
			}
		};				
	},
	inputError:function (div,texto_ayuda) {
		div.removeClass('bueno');
		div.addClass('fallo');
		contedor = div.next();
		contedor.empty().addClass('text_fallo').append(texto_ayuda);
	},
	validarEmail:function( email ) {
		expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ( !expr.test(email) ){
		 	return false
		}else{
		 	return true
		}
	},
	modificar_cabezera:function (titulo,descripcion) {
		document.title=titulo + ' | LovizdelCarpio.com'
		$('meta[name="description"]').remove();
		$('head').append("<meta name='description' content='"+descripcion+"'>");
	},
	cargar_bloques:function () {
		var self = this;
		this.coleccion_bloques = new Loviz.Collections.Bloques();
		this.coleccion_bloques.fetch({
			data:$.param({cms:'slug'})
		}).done(function () {
			self.coleccion_bloques.forEach(self.crear_bloque,self)
		})
	},
	crear_bloque:function (bloque) {
		var views_bloque = new Loviz.Views.Bloque({model:bloque});
	},
	cargar_menus:function () {
		var self = this;
		this.coleccion_menus = new Loviz.Collections.Menus();
		this.coleccion_menus.fetch({
			data:$.param({cms:'slug'})
		}).done(function () {
			self.coleccion_menus.forEach(self.crear_menu,self)
		})
	},
	crear_menu:function (menu) {
		var views_menu = new Loviz.Views.Menu({model:menu});
	}
});
