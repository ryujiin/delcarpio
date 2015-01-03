# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsloviz', '0003_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='menu',
            field=models.ForeignKey(to='cmsloviz.Menu'),
            preserve_default=True,
        ),
    ]
