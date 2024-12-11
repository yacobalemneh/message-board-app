from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination


class PostPagination(PageNumberPagination):
    page_size = 5


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PostPagination
    queryset = Post.objects.all()

    def get_queryset(self):
        filter_type = self.request.query_params.get('filter', 'newest')
        if filter_type == 'popular':
            return Post.objects.all().order_by('-likes')
        return Post.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        print("Received data:", self.request.data)
        print("Received data:", self.request.data)
        print("Auth:", self.request.headers.get('Authorization'))
        serializer.save(
            author=self.request.user,
        )


class LikePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            if request.data.get('unlike', False):
                post.likes = max(0, post.likes - 1)  # Prevent negative likes
            else:
                post.likes += 1
            post.save()
            return Response(PostSerializer(post).data)
        except Post.DoesNotExist:
            return Response(
                {'error': 'Post not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class DeletePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
            if post.author != request.user:
                return Response(
                    {'error': 'Not authorized to delete this post'},
                    status=status.HTTP_403_FORBIDDEN
                )
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response(
                {'error': 'Post not found'},
                status=status.HTTP_404_NOT_FOUND
            )
