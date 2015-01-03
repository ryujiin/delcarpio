from django.conf.urls import patterns, include, url
from django.contrib import admin

from django.conf import settings

from rest_framework import routers
from catalogo.views import *
from cliente.views import UsuarioViewSet,ComentarioViewSet,DireccionViewsets
from carro.views import LineasViewsets
from ubigeo.views import RegionViewset
from cmsloviz.views import HomeView,PaginaViewsets,PaginaViewsApi,BloqueViewsets,CarruselViewset,MenuViewsets

from desboard.views import DesboardView

router = routers.DefaultRouter()

router.register(r'catalogo', CatalogoViewsets,'catalogo')
router.register(r'productoSingle', Producto_singleViewstes,'productosingle')
router.register(r'usuario',UsuarioViewSet)
router.register(r'lineas',LineasViewsets,'lineas')
router.register(r'cliente/comentario',ComentarioViewSet,'comentairos')
router.register(r'cliente/direcciones',DireccionViewsets,'direcciones')
router.register(r'ubigeo',RegionViewset,'ubigeo')

##Catalogo##
router.register(r'categorias', CategoriaViewsets,'categorias')

#router.register(r'colores', ColorViewsets,'colores')
router.register(r'filtro/colores', ColorViewsets,'generos')
router.register(r'filtro/tallas', TallaViewsets,'tallas')
#router.register(r'secciones', SeccionViewsets,'secciones')
router.register(r'filtro/estilos', EstiloViewsets,'estilos')

##Tienda##
router.register(r'tienda/pagina',PaginaViewsets,'paginas');
router.register(r'tienda/bloques',BloqueViewsets,'bloques');
router.register(r'tienda/carruseles',CarruselViewset,'carruseles');
router.register(r'tienda/menus',MenuViewsets,'menus');

urlpatterns = patterns('',
    # Examples:
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/cliente/', include('cliente.urls')),
    url(r'^api/carro/', include('carro.urls')),
    url(r'^api/tienda/pagina/$',PaginaViewsApi.as_view()),
    url(r'^api/productoSingle/$',Producto_singleView.as_view()),
    url(r'^ajax/login/', 'cliente.views.ingresar', name='ingresar_ajax'),
    url(r'^ajax/salir/', 'cliente.views.salir', name='salir'),
    
    url(r'^desboard/', DesboardView.as_view()),

    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
    #url(r'^api-token/login/(?P<backend>[^/]+)/$',ObtainAuthToken.as_view()),
    #url(r'^register/(?P<backend>[^/]+)/', 'cliente.views.register_by_access_token'),
    #url('', include('social.apps.django_app.urls',namespace="social")),


    url(r'^admin/', include(admin.site.urls)),

    url(r'^', include('cmsloviz.urls')),

)
if settings.DEBUG:
    urlpatterns = patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
) + urlpatterns