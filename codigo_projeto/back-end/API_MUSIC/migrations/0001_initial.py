# Generated by Django 4.2.7 on 2023-11-27 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EspInfoEntity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField(auto_now_add=True)),
                ('tempo_de_estudo', models.FloatField(default=0.0)),
                ('ultima_atualizacao', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
