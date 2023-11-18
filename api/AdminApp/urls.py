from django.urls import path
from AdminApp import views

urlpatterns = [
    path('student/', views.studentApi),
    path('student/<int:StudentId>/', views.studentApi),
    path('transaction/', views.transactionApi),
    path('transaction/<int:TransactionId>/', views.transactionApi),
    path('transaction_history/', views.transactionHistoryApi),
    path('transaction_history/<int:StudentId>/', views.transactionHistoryApi),
]