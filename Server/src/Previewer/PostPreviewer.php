<?php

namespace App\Previewer;
use App\Entity\Post;
class PostPreviewer
{
    private UserPreviewer $userPreviewer;
    public function __construct(UserPreviewer $userPreviewer)
    {
        $this->userPreviewer = $userPreviewer;
    }

    public function previewAsAuthor(Post $post):array
    {
        return array_merge($this->previewPublicInfo($post),
            [
                "mainText" => $post->getMainText(),
                "author" => $this->userPreviewer->preview($post->getAuthor()),
                "isReachableById" =>$post->isIsReachableById()
            ]);
    }

    public function previewAsNotAuthor(Post $post):array
    {
        return array_merge($this->previewPublicInfo($post),
        [
            "mainText" => (!$post->getPublicationDate() || $post->getPublicationDate() < new \DateTime("now")) ? $post->getMainText() : NULL,
            "author" => $post->isIsAnonymous() ? NULL : $this->userPreviewer->preview($post->getAuthor()),
        ]);
    }
    private function previewPublicInfo(Post $post): array
    {
        return [
            "descriptionText" => $post->getDescriptionText(),
            "creationDate" => $post->getCreationDate(),
            "publicationDate" => $post->getPublicationDate(),
            "id" => $post->getId(),
            "customId" => $post->getCustomId(),
            "isEncrypted" => $post->isIsEncrypted(),
            "isAnonymous" => $post->isIsAnonymous()
        ];
    }
}