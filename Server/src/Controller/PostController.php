<?php

namespace App\Controller;
use App\Entity\User;
use App\Previewer\PostPreviewer;
use App\Repository\PostRepository;
use http\Env\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/post', name: 'testC', methods: ['GET'])]
class PostController extends ApiController
{
    private PostRepository $postRepository;
    private PostPreviewer $postPreviewer;
    public function __construct(PostRepository $postRepository, PostPreviewer $postPreviewer)
    {
        $this->postRepository = $postRepository;
        $this->postPreviewer = $postPreviewer;
    }
    #[Route('/{postId}', name: 'get_post_by_id', requirements: ['postId' => '\w+'], methods: ['GET'])]
    public function getById(string $postId): JsonResponse
    {
        try {
            $post_by_id = $this->postRepository->find($postId);
            if ($post_by_id && !$post_by_id->isIsReachableById()) {
                $post_by_id = NULL;
            }
            $post_by_custom_id = $this->postRepository->findOneBy(["customId"=>$postId]);

            if (!$post_by_id && !$post_by_custom_id) {
                return $this->respondNotFound();
            }

            $post_by_id ? $post = $post_by_id : $post = $post_by_custom_id;

            if ($this->getUser() && $this->getUser()->getId()===$post->getAuthor()->getId()) {
                return $this->response($this->postPreviewer->previewAsAuthor($post));
            } else {
                return $this->response($this->postPreviewer->previewAsNotAuthor($post));
            }
        } catch (\Exception $exception) {
            return $this->respondWithErrors($exception);
        }
    }
}