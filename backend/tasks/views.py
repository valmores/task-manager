from rest_framework import viewsets, status
from rest_framework.response import Response
from tasks.models import Task
from tasks.serializers import TaskSerializer


class TaskViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing tasks.
    Uses manual CRUD operations instead of ModelViewSet.
    """

    def list(self, request):
        """GET /tasks/ — List all tasks"""
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def create(self, request):
        """POST /tasks/ — Create a new task"""
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """GET /tasks/{id}/ — Retrieve a task by ID"""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """PUT /tasks/{id}/ — Update task title and description only"""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        """PATCH /tasks/{id}/ — Toggle task completed status only"""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        task.completed = not task.completed
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        """DELETE /tasks/{id}/ — Delete a task"""
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(
                {'error': 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
