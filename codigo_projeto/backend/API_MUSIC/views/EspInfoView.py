from rest_framework import viewsets, status
from rest_framework.response import Response
from API_MUSIC.serializer.EspInfoSerializer import EspInfoSerializer
from API_MUSIC.models import EspInfoEntity
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class EspInfoViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = EspInfoEntity.objects.all()
        serializer = EspInfoSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EspInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Retorna explicitamente uma resposta JSON com status 201
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Mantém o receiver para o sinal post_save, isso é parte da lógica do modelo EspInfoEntity
@receiver(post_save, sender=EspInfoEntity)
def reset_daily_data(sender, instance, **kwargs):
    if (timezone.now() - instance.ultima_atualizacao).days >= 1:
        instance.tempo_de_estudo = 0.0
        instance.ultima_atualizacao = timezone.now()
        instance.save()
