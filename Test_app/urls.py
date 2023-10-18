from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.users, name="users"),
    path('groups',views.groups, name = "groups"),
    path("userlist", views.users_list, name = "userlist")
]