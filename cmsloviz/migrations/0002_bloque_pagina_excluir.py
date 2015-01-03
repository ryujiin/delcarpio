# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsloviz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloque',
            name='pagina_excluir',
            field=models.ForeignKey(related_name='bloques_excluidos', blank=True, to='cmsloviz.Pagina', null=True),
            preserve_default=True,
        ),
    ]
