# Generated by Django 5.1.6 on 2025-03-16 17:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authUser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatRoom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.CharField(max_length=255, unique=True)),
                ('first_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='firstUser', to='authUser.customeuser')),
                ('second_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authUser.customeuser')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('time', models.CharField(max_length=20)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('phonenumber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='number', to='authUser.customeuser')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room', to='chat.chatroom')),
            ],
        ),
    ]
