from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('upload-database/', views.FileUpload, name="upload_db"),
    path('database/', views.DatabaseViewSet, name="database"),
    path('workspace/', views.WorkspaceViewSet, name="workspace"),
    path('workspace/<int:id>/', views.WorkspacePostViewSet.as_view(), name="workspacePost"),
    path('dashboard/', views.DashboardViewSet, name="dashboard"),
    path('dashboard/<int:id>/', views.DashboardUpdateViewSet, name="dashboardPost"),
    path('chart/', views.ChartViewSet, name="chart"),
    path('chart/<int:id>/', views.ChartUpdateViewSet, name="chartSingle"),
    path('authenticate', views.getRoutes),
    path('upload-file/', views.FileUploadView.as_view(), name='file_upload'),
    path('download-file/<int:pk>/', views.FileDownloadView.as_view(), name='file_view'),#download option
    path('view-file/', views.view_all_files, name='view_file_all'), 
    path('view-file/<int:pk>/', views.view_file, name='view_file'), #display content
]