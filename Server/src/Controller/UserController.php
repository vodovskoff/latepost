<?php

namespace App\Controller;

namespace App\Controller;
use App\Entity\Post;
use App\Entity\User;
use App\Previewer\PostPreviewer;
use App\Repository\PostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user', name: 'testC', methods: ['GET'])]
class UserController extends ApiController
{
    private PostRepository $postRepository;
    private PostPreviewer $postPreviewer;
    public function __construct(PostRepository $postRepository, PostPreviewer $postPreviewer)
    {
        $this->postPreviewer = $postPreviewer;
        $this->postRepository = $postRepository;
    }

    #[Route('/posts', name: 'get_post_by_jwt', requirements: ['postId' => '\w+'], methods: ['GET'])]
    public function getPostsByJwt(): JsonResponse
    {
        try {
            if (!$this->getUser()) {
                return $this->respondWithErrors("You need to authenticate");
            }

            $posts = array_map(
                fn($p): array => $this->postPreviewer->previewAsAuthor($p),
                $this->postRepository->findBy(["author"=>$this->getUser()]));

            return $this->response($posts);
        } catch (\Exception $exception) {
            return $this->respondWithErrors($exception);
        }
    }
}