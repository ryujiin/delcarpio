# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import cmsloviz.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bloque',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('nombre_interno', models.CharField(unique=True, max_length=120)),
                ('activo', models.BooleanField(default=True)),
                ('cuerpo', models.TextField(null=True, blank=True)),
                ('foto', models.ImageField(null=True, upload_to=cmsloviz.models.url_imagen_pr, blank=True)),
                ('link', models.CharField(max_length=120, null=True, blank=True)),
                ('css', models.CharField(max_length=120, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Carrusel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('nombre_interno', models.CharField(max_length=120, unique=True, null=True, blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('cuerpo', models.TextField(null=True, blank=True)),
                ('modelo', models.CharField(max_length=120, null=True, blank=True)),
                ('filtro', models.CharField(max_length=120, null=True, blank=True)),
                ('items_mostrar', models.CharField(max_length=120, null=True, blank=True)),
                ('css', models.CharField(max_length=120, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('nombre_interno', models.CharField(unique=True, max_length=120)),
                ('css', models.CharField(max_length=120, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pagina',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('slug', models.CharField(max_length=120, unique=True, null=True, blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('cuerpo', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SeccionesPagina',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=120)),
                ('nombre_interno', models.CharField(max_length=120, unique=True, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TemplatePagina',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=120)),
                ('nombre_interno', models.CharField(max_length=120, unique=True, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='pagina',
            name='template',
            field=models.ForeignKey(blank=True, to='cmsloviz.TemplatePagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='menu',
            name='pagina',
            field=models.ForeignKey(related_name='menus', blank=True, to='cmsloviz.Pagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='menu',
            name='seccion',
            field=models.ForeignKey(blank=True, to='cmsloviz.SeccionesPagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='menu',
            name='template',
            field=models.ForeignKey(blank=True, to='cmsloviz.TemplatePagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='carrusel',
            name='pagina',
            field=models.ForeignKey(related_name='carruseles', blank=True, to='cmsloviz.Pagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='carrusel',
            name='seccion',
            field=models.ForeignKey(blank=True, to='cmsloviz.SeccionesPagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='carrusel',
            name='template',
            field=models.ForeignKey(blank=True, to='cmsloviz.TemplatePagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bloque',
            name='pagina',
            field=models.ForeignKey(related_name='bloques', blank=True, to='cmsloviz.Pagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bloque',
            name='seccion',
            field=models.ForeignKey(blank=True, to='cmsloviz.SeccionesPagina', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bloque',
            name='template',
            field=models.ForeignKey(blank=True, to='cmsloviz.TemplatePagina', null=True),
            preserve_default=True,
        ),
    ]
