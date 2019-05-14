from django import forms
# from .models import Post
from django.contrib.auth.models import User


'''class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'text',)'''


class SignUp(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')


class LogIn(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'password')
