from django.urls import path
from .views import PostListCreateView, LikePostView, DeletePostView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='posts'),
    path('<int:post_id>/like/', LikePostView.as_view(), name='like_post'),
    path('<int:post_id>/delete/', DeletePostView.as_view(), name='post-delete'),
]
