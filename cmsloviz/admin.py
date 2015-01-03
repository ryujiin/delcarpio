from django.contrib import admin
from models import *
# Register your models here.

class LinkInline(admin.TabularInline):
	model = Link


class MenuAdmin(admin.ModelAdmin):
	inlines = [LinkInline,]
	#filter_horizontal = ('parientes',)
	#list_display = ('full_name','nombre','slug','get_parientes')


class PaginaAdmin(admin.ModelAdmin):
	list_display = ('id','titulo','slug')

admin.site.register(Menu,MenuAdmin)
admin.site.register(Bloque)
admin.site.register(Pagina,PaginaAdmin)
admin.site.register(SeccionesPagina)
admin.site.register(Carrusel)
admin.site.register(TemplatePagina)

