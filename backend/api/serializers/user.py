from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nickname', 'qq', 'username']
        read_only_fields = ['id', 'username']

    def validate(self, data):
        nickname = data.get('nickname', '')
        if len(nickname) > 50:
            raise serializers.ValidationError("Nickname cannot be longer than 50 characters.")

        qq = data.get('qq', '')
        if qq and not qq.isdigit():
            raise serializers.ValidationError("QQ must contain only numbers.")
        if qq and len(qq) > 20:
            raise serializers.ValidationError("QQ cannot be longer than 20 digits.")

        return data