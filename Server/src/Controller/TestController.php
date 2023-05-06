<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'testC', methods: ['GET'])]
class TestController extends AbstractController
{
    #[Route('/test',name: 'test', methods: ['GET'])]
    public function test(): JsonResponse
    {
        return $this->json(
            [
                'status' => '$statusCode',
                'success' => '$success',
            ],
            200,
            ["fetheaders"]
        );
    }
}