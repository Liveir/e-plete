from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from AdminApp.models import Students, Transactions
from AdminApp.serializers import StudentSerializer, TransactionSerializer

@csrf_exempt
def studentApi(request, pk=0):
    if request.method=='GET':
        if (pk):
            students = Students.objects.get(StudentId=pk)
            students_serializer = StudentSerializer(students,many=False)
            return JsonResponse(students_serializer.data,safe=False)
        else:
            students = Students.objects.all()
            students_serializer = StudentSerializer(students,many=True)
            return JsonResponse(students_serializer.data,safe=False)
    
    elif request.method=='POST':
        student_data = JSONParser().parse(request)
        students_serializer = StudentSerializer(data=student_data)
        if students_serializer.is_valid():
            students_serializer.save()
            return JsonResponse("Added successfully",safe=False)
    
    elif request.method=='PUT':
        student_data = JSONParser().parse(request)
        student = Students.objects.get(StudentId=student_data['StudentId'])
        students_serializer = StudentSerializer(student,data=student_data)
        if students_serializer.is_valid():
            students_serializer.update(student, student_data)
            return JsonResponse("Updated successfully",safe=False)
        return JsonResponse("Failed to update")
    
    elif request.method=='DELETE':
        student = Students.objects.get(StudentId=pk)
        student.delete()
        return JsonResponse("Deleted successfully",safe=False)
    
@csrf_exempt
def transactionHistoryApi(request, pk=0):
    if request.method == 'GET':
        if (pk):
            student = Students.objects.get(StudentId=pk)
            transactions = student.transactions.all()
            transactions_serializer = TransactionSerializer(transactions, many=True)
            return JsonResponse(transactions_serializer.data, safe=False)
        else:
            transactions = Transactions.objects.all()
            transactions_serializer = TransactionSerializer(transactions, many=True)
            return JsonResponse(transactions_serializer.data, safe=False)


@csrf_exempt
def transactionApi(request, pk=0):
    if request.method=='GET':
        transaction_data = []
        if pk:
            transaction = Transactions.objects.get(TransactionId=pk)
            transaction_data = {
                'TransactionId': transaction.TransactionId,
                'TransactionDate': transaction.TransactionDate,
                'TransactionTime': transaction.TransactionTime,
                'TransactionAmount': transaction.TransactionAmount,
                'Student': {
                    'RFID': transaction.Student.RFID,
                    'StudentId': transaction.Student.StudentId,
                    'StudentName': transaction.Student.StudentName,
                    'StudentBalance': transaction.Student.StudentBalance,
                    'StudentStatus' : transaction.Student.StudentStatus,
                    'StudentEmail' : transaction.Student.StudentEmail,
                },
                'TransactionType': transaction.TransactionType
            }

        else:
            transactions = Transactions.objects.all()
            for transaction in transactions:
                transaction_details = {
                    'TransactionId': transaction.TransactionId,
                    'TransactionDate': transaction.TransactionDate,
                    'TransactionTime': transaction.TransactionTime,
                    'TransactionAmount': transaction.TransactionAmount,
                    'Student': {
                        'RFID': transaction.Student.RFID,
                        'StudentId': transaction.Student.StudentId,
                        'StudentName': transaction.Student.StudentName,
                        'StudentBalance': transaction.Student.StudentBalance,
                        'StudentStatus' : transaction.Student.StudentStatus,
                        'StudentEmail' : transaction.Student.StudentEmail,
                    },
                    'TransactionType': transaction.TransactionType
                }
                transaction_data.append(transaction_details)

        return JsonResponse(transaction_data, safe=False)
    
    elif request.method=='POST':
        transaction_data = JSONParser().parse(request)
        student_data = transaction_data.pop('Student')
        # Create the Student record
        student, created = Students.objects.get_or_create(RFID=student_data['RFID'],
                                                          StudentId=student_data['StudentId'],
                                                          StudentName=student_data['StudentName'],
                                                          StudentBalance=student_data['StudentBalance'],
                                                          StudentStatus=student_data['StudentStatus'],
                                                          StudentEmail=student_data['StudentEmail'])

        # Create the Transaction record
        transaction = Transactions(
            TransactionDate=transaction_data['TransactionDate'],
            TransactionTime=transaction_data['TransactionTime'],
            TransactionAmount=transaction_data['TransactionAmount'],
            TransactionType=transaction_data['TransactionType'],
            Student=student
        )
        transaction.save()
        
        if created:
            message = 'Student created and transaction created successfully'
        else:
            message = 'Transaction created successfully'
        return JsonResponse(message, safe=False)
    
    elif request.method=='PUT':
        transaction_data = JSONParser().parse(request)
        student_data = transaction_data.pop('Student')

        # Get the existing records
        transaction = Transactions.objects.get(TransactionId=pk)
        student = Students.objects.get(StudentId=student_data['StudentId'])
        
        # Update the Transaction record
        transaction.TransactionDate = transaction_data['TransactionDate']
        transaction.TransactionTime = transaction_data['TransactionTime']
        transaction.TransactionAmount = transaction_data['TransactionAmount']
        transaction.TransactionType = transaction_data['TransactionType']
        transaction.Student = student
        transaction.save()
        message = 'Transaction updated successfully'

        # Update the Student record if necessary
        students_serializer = StudentSerializer(student,data=student_data)
        if students_serializer.is_valid():
            students_serializer.update(student, student_data)
            message = 'Student and transaction updated successfully'

        return JsonResponse(message, safe=False)
    
    elif request.method=='DELETE':
        transaction = Transactions.objects.get(TransactionId=pk)
        transaction.delete()
        return JsonResponse("Deleted successfully",safe=False)