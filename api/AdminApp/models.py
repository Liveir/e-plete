from django.db import models

# Create your models here.

class Students(models.Model):
    RFID = models.CharField(max_length=500)
    StudentId = models.IntegerField(primary_key=True)
    StudentName = models.CharField(max_length=500)
    StudentEmail = models.CharField(max_length=500)
    StudentBalance = models.FloatField(default=0)
    StudentStatus = models.CharField(max_length=500)

class Transactions(models.Model):
    TransactionId = models.AutoField(primary_key=True)
    TransactionDate = models.CharField(max_length=500)
    TransactionTime = models.CharField(max_length=500)
    TransactionAmount = models.FloatField(default=0)
    TransactionType = models.CharField(max_length=500)
    Student = models.ForeignKey(Students, on_delete=models.CASCADE, related_name='transactions')



