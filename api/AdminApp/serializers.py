from rest_framework import serializers
from AdminApp.models import Students, Transactions

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Students
        fields=['RFID', 'StudentId', 'StudentName', 'StudentBalance', 'StudentStatus', 'StudentEmail']

class TransactionSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.StudentName')
    class Meta:
        model = Transactions
        fields = ['TransactionId', 'TransactionDate', 'TransactionTime', 'TransactionAmount', 'student_name', 'TransactionType']
