from django.urls import path
from AdminApp import views

urlpatterns = [
    path('student/', views.studentApi),
    path('student/<int:pk>/', views.studentApi),
    path('transaction/', views.transactionApi),
    path('transaction/<int:pk>/', views.transactionApi),
    path('transaction_history/', views.transactionHistoryApi),
    path('transaction_history/<int:pk>/', views.transactionHistoryApi),
]