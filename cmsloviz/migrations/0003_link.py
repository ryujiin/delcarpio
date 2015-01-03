# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsloviz', '0002_bloque_pagina_excluir'),
    ]

    operations = [
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=120, null=True, blank=True)),
                ('css', models.CharField(max_length=120, null=True, blank=True)),
                ('enlace', models.CharField(max_length=120, null=True, blank=True)),
                ('menu', models.ForeignKey(blank=True, to='cmsloviz.SeccionesPagina', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
