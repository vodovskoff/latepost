<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

#[Route('/api', name: 'testC', methods: ['GET'])]
class RegistrationController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/registration', name: 'app_registration')]
    public function index(Request $request, UserPasswordHasherInterface $encoder): JsonResponse
    {
        try {
            $decoded = json_decode($request->getContent());
            $password = $decoded->password;

            $user = new User();
            $user->setPassword($encoder->hashPassword($user, $password));
            $user->setUsername($decoded->username);
            $this->em->persist($user);
            $this->em->flush();

            return $this->json(['message' => 'Registered Successfully']);
        } catch (\Exception $e)
        {
            return $this->json(['message' => 'Registered UnSuccessfully']);
        }
    }
}
