from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
# router.register(r'workspace', views.WorkspaceViewSet)
# router.register(r'dashboard', views.DashboardViewSet)
# router.register(r'chart', views.ChartViewSet)

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
    path('workspace/', views.WorkspaceViewSet.as_view(), name="workspace"),
    path('workspace/<int:id>/', views.WorkspacePostViewSet.as_view(), name="workspacePost"),
    path('dashboard/', views.DashboardViewSet, name="dashboard"),
    path('dashboard/<int:id>/', views.DashboardUpdateViewSet, name="dashboardPost"),
    path('chart/', views.ChartViewSet, name="chart"),
    path('chart/<int:id>/', views.ChartUpdateViewSet, name="chartSingle"),
    path('authenticate', views.getRoutes),

]

