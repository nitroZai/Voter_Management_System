# Generated by Django 4.0.4 on 2022-06-24 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voter', '0002_voter_is_voted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voter',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'), ('Denied', 'Denied')], default='Accepted', max_length=10),
        ),
    ]
