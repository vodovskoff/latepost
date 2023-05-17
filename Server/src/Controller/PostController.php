<?php

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

#[Route('/api/post', name: 'testC', methods: ['GET'])]
class PostController extends ApiController
{
    private PostRepository $postRepository;
    private PostPreviewer $postPreviewer;
    private EntityManagerInterface $entityManager;
    public function __construct(PostRepository $postRepository, PostPreviewer $postPreviewer, EntityManagerInterface $entityManager)
    {
        $this->postRepository = $postRepository;
        $this->postPreviewer = $postPreviewer;
        $this->entityManager = $entityManager;
    }
    #[Route('/{postId}', name: 'get_post_by_id', requirements: ['postId' => '\w+'], methods: ['GET'])]
    public function getById(string $postId): JsonResponse
    {
        try {
            $postId = str_replace(' ', '_', $postId);
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

    #[Route('/', name: 'create_post', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            if (!$this->getUser()) {
                return $this->respondWithErrors("You need to authenticate");
            }

            $decodedRequest = json_decode($request->getContent());
            if ($decodedRequest->customId &&
                ($this->postRepository->findOneBy(["customId"=>$decodedRequest->customId]) || $this->postRepository->find($decodedRequest->customId))) {
                return $this->respondValidationError("Post with this customId already exists");
            }

            $post = new Post();
            $this->updateOrCreatePostFromDecodedRequest($post, $decodedRequest);
            return $this->respondWithSuccess("Post added successfully");

        } catch (\Exception $exception) {
            return $this->respondWithErrors($exception);
        }
    }

    #[Route('/', name: 'update_post', methods: ['UPDATE'])]
    public function update(Request $request): JsonResponse
    {
        try {
            if (!$this->getUser()) {
                return $this->respondWithErrors("You need to authenticate");
            }

            $decodedRequest = json_decode($request->getContent());
            $tempPost = $this->postRepository->findOneBy(["customId"=>$decodedRequest->customId]);
            if ($decodedRequest->customId && $tempPost->getId()!=$decodedRequest->id) {
                return $this->respondValidationError("Post with this customId already exists");
            }

            $post = $this->postRepository->find($decodedRequest->id);
            $this->updateOrCreatePostFromDecodedRequest($post, $decodedRequest);
            return $this->respondWithSuccess("Post updated successfully");

        } catch (\Exception $exception) {
            return $this->respondValidationError($exception->getMessage());
        }
    }

    /**
     * @param Post|null $post
     * @param mixed $decodedRequest
     * @return void
     * @throws \Exception
     */
    private function updateOrCreatePostFromDecodedRequest(?Post $post, mixed $decodedRequest): void
    {
        $post->setAuthor($this->getUser());
        $post->setCustomId($decodedRequest->customId);
        $post->setDescriptionText($decodedRequest->descriptionText);
        $post->setIsAnonymous($decodedRequest->isAnonymous);
        $post->setIsEncrypted($decodedRequest->isEncrypted);
        $post->setIsReachableById($decodedRequest->isReachableById);
        $post->setMainText($decodedRequest->mainText);
        $post->setPublicationDate(new \DateTime($decodedRequest->publicationDate));
        $this->entityManager->flush();
    }
}