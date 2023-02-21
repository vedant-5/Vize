from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username','email','password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class DatabaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Database
        fields =  "__all__"

class WorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields =  "__all__"

class DashboardSerializer(serializers.ModelSerializer):
    # workspace_name = serializers.SerializerMethodField()

    class Meta:
        model = Dashboard
        fields = "__all__"

    # def get_workspace_name(self, obj):
    #     print(obj)
    #     return obj.workspace
    
class ChartSerializer(serializers.ModelSerializer):
    # dashboard_name = serializers.SerializerMethodField()
    # workspace_name = serializers.SerializerMethodField()

    class Meta:
        model = Chart
        fields = "__all__"

    # def get_dashboard_name(self, obj):
    #     return obj.dashboard
    
    # def get_workspace_name(self, obj):
    #     return obj.workspace

    