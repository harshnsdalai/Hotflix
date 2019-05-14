from django.urls import path, include
from django.conf.urls import url

from . import views


urlpatterns = [
    path('', views.home, name="home"),
    path("login/", views.log_in, name="log_in"),
    path("logout/", views.log_out, name="log_out"),
    path("register/", views.sign_up, name="sign_up"),
]