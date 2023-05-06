<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
#[Route('', name: 'testC', methods: ['GET'])]

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

    #[Route('/api/test', name: 'test1', methods: ['GET'])]
    public function test1(): JsonResponse
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