from django.db import models

# Create your models here.

class Students(models.Model):
    student_id = models.AutoField(primary_key=True)
    RFID = models.CharField(max_length=500)
    StudentId = models.IntegerField(unique=True)
    StudentName = models.CharField(max_length=500)
    StudentEmail = models.CharField(max_length=500)
    StudentBalance = models.FloatField(default=0)
    StudentStatus = models.CharField(max_length=500)

class Transactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    TransactionId = models.BigIntegerField(unique=True)
    TransactionDate = models.CharField(max_length=500)
    TransactionTime = models.CharField(max_length=500)
    TransactionAmount = models.FloatField(default=0)
    TransactionType = models.CharField(max_length=500)
    Student = models.ForeignKey(Students, on_delete=models.CASCADE, related_name='transactions')



