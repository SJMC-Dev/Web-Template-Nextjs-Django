from django.urls import path
from api.views.user import UserProfileAPIView

urlpatterns = [
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
]