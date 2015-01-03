# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('carro', '0002_prueba'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EnvioEvento',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('notes', models.TextField(help_text='This could be the dispatch reference, or a tracking number', null=True, verbose_name='Event notes', blank=True)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EnvioEventoTipo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255, verbose_name='Name')),
                ('code', models.SlugField(unique=True, max_length=128, verbose_name='Code')),
                ('is_required', models.BooleanField(default=True, help_text='This event must be passed before the next shipping event can take place', verbose_name='Is Required')),
                ('sequence_number', models.PositiveIntegerField(default=0, verbose_name='Sequence')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PagoEvento',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.DecimalField(verbose_name='Amount', max_digits=12, decimal_places=2)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PagoEventoTipo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(unique=True, max_length=128, verbose_name=b'Nombre')),
                ('code', models.SlugField(unique=True, max_length=128, verbose_name=b'Code')),
                ('explicacion', models.TextField(verbose_name=b'Explicacion')),
                ('secuencia_numero', models.PositiveIntegerField(default=0, verbose_name=b'Secuencia')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('numero', models.CharField(max_length=128, verbose_name=b'Numero de Pedido', db_index=True)),
                ('total_sin_envio', models.DecimalField(default=0, max_digits=12, decimal_places=2)),
                ('total_con_envio', models.DecimalField(default=0, max_digits=12, decimal_places=2)),
                ('metodo_envio', models.CharField(max_length=150, null=True, verbose_name=b'Metodo de envio', blank=True)),
                ('estado', models.CharField(max_length=128, null=True, verbose_name=b'Estado de la orden', blank=True)),
                ('email_invitado', models.EmailField(max_length=75, null=True, verbose_name='Email de Invitado', blank=True)),
                ('fecha_orden', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('carro_id', models.ForeignKey(blank=True, to='carro.Carro', null=True)),
                ('direccion', models.ForeignKey(blank=True, to='cliente.Direccion', null=True)),
                ('usuario', models.ForeignKey(related_name='pedidos', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PedidoNota',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('note_type', models.CharField(max_length=128, null=True, verbose_name=b'Tipo de Nota')),
                ('mensaje', models.TextField(verbose_name=b'Mensajes')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Updated')),
                ('orden', models.ForeignKey(related_name='notas', to='pedido.Pedido')),
                ('usuario', models.ForeignKey(related_name='ordenes', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='pagoevento',
            name='event_type',
            field=models.ForeignKey(verbose_name='Event Type', to='pedido.PagoEventoTipo'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pagoevento',
            name='order',
            field=models.ForeignKey(related_name='pago eventos', verbose_name='Order', to='pedido.Pedido'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='envioevento',
            name='event_type',
            field=models.ForeignKey(verbose_name='Event Type', to='pedido.EnvioEventoTipo'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='envioevento',
            name='order',
            field=models.ForeignKey(related_name='envio_evento', verbose_name='Order', to='pedido.Pedido'),
            preserve_default=True,
        ),
    ]
