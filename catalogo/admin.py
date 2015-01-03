from django.contrib import admin
from models import *
# Register your models here.

class ProductoImagenInline(admin.TabularInline):
	model = ProductoImagen

class VariacionInline(admin.TabularInline):
	model = ProductoVariacion

class MaterialesInline(admin.TabularInline):
	model = MaterialesProductos

class ProductoAdmin(admin.ModelAdmin):
	inlines = [ProductoImagenInline,VariacionInline,MaterialesInline,]
	filter_horizontal = ('parientes',)
	list_display = ('full_name','nombre','slug','get_parientes')


admin.site.register(Producto,ProductoAdmin)
admin.site.register(Color)
admin.site.register(Talla)
admin.site.register(Categoria)
admin.site.register(Seccion)
admin.site.register(Estilo)
admin.site.register(Genero)
admin.site.register(Material)