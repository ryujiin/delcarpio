# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsloviz', '0005_link_icono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='menu',
            field=models.ForeignKey(related_name='links', to='cmsloviz.Menu'),
            preserve_default=True,
        ),
    ]
