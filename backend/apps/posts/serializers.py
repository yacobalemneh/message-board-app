from rest_framework import serializers
from apps.users.models import User
from .models import Post


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True)
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'author', 'created_at', 'tags', 'likes']
        read_only_fields = ['author', 'likes']

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        tags_string = ','.join(tags) if tags else ''
        return Post.objects.create(**validated_data, tags=tags_string)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['tags'] = instance.tags.split(',') if instance.tags else []
        return data
