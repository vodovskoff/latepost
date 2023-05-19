<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

#[Route('/api/registration', name: 'testC')]
class RegistrationController extends ApiController
{
    private EntityManagerInterface $em;
    private UserRepository $userRepository;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepository)
    {
        $this->em = $em;
        $this->userRepository = $userRepository;
    }

    #[Route('', name: 'app_registration', methods: ['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $encoder): JsonResponse
    {
        try {
            $decoded = json_decode($request->getContent());
            $password = $decoded->password;

            if ($this->userRepository->findBy(["username"=>$decoded->username])) {
                return $this->respondWithErrors("User already exists", 409, []);
            }

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
