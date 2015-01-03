from models import *
from rest_framework import serializers
from django.contrib.auth.models import User as User


class DireccionSerilizer(serializers.ModelSerializer):
	slug_depa = serializers.SerializerMethodField()
	slug_provi = serializers.SerializerMethodField()
	slug_distri = serializers.SerializerMethodField()
	class Meta:
		model = Direccion
		fields = ('id','tipo','direccion','codigo_postal','usuario','departamento','provincia','distrito','slug_depa','slug_provi','slug_distri')

	def get_slug_depa(self,obj):
		return obj.departamento.name

	def get_slug_provi(self,obj):
		return obj.provincia.name

	def get_slug_distri(self,obj):
		return obj.distrito.name

class UsuarioSerializer(serializers.ModelSerializer):
	direcciones = DireccionSerilizer(many=True)

	class Meta:
		model = User
		fields = ('id','username','first_name','last_name','email','is_staff','direcciones')

class PerfilUSerSerializer(serializers.ModelSerializer):
	email = serializers.SerializerMethodField('get_email')
	nombre = serializers.SerializerMethodField('get_nombre')
	apellido = serializers.SerializerMethodField('get_apellido')

	direcciones = DireccionSerilizer(many=True)
	class Meta:
		model = Cliente
		fields = ('id','usuario','nombre','apellido','email','dni','telefono','direcciones')

	def get_email(self,obj):
		return obj.usuario.email

	def get_nombre(self,obj):
		return obj.usuario.first_name

	def get_apellido(self,obj):
		return obj.usuario.last_name



class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model=User
		fields = ('username','password', 'first_name', 'last_name', 'email')
		write_only_fields = ('password',)

	def restore_object(self, attrs, instance=None):
		user = super(UserSerializer, self).restore_object(attrs, instance)
		user.set_password(attrs['password'])
		return user

from django.utils.timesince import timesince

class ComentairoSerializer(serializers.ModelSerializer):
	creado = serializers.SerializerMethodField('get_tiempo_creado')
	nombre = serializers.SerializerMethodField('get_nombre_user')
	img_producto = serializers.SerializerMethodField('get_img')
	class Meta:
		model = Comentario
		fields = ('id','verificado','valoracion','titulo_comentario','comentario','creado','producto','variacion','usuario','nombre','img_producto','email_invitado')

	def get_tiempo_creado(self,obj):
		time = timesince(obj.creado)
		return time

	def get_nombre_user(self,obj):
		if obj.usuario:
			return obj.usuario.username

	def get_img(self,obj):
		return obj.producto.get_thum().url