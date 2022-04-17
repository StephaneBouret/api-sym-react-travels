<?php

namespace App\Entity;

use App\Entity\Travel;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ImagesRepository;
use App\Controller\CarouselImageController;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: ImagesRepository::class)]
#[ApiResource(
    subresourceOperations: [
        'api_travel_images_get_subresource' => [
            'normalization_context' => [
                'groups' => ['image_subresource'],
            ],
        ],
        'travel_get_subresource' => [
            'path' => 'images/{id}/travel'
        ]
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
    itemOperations: [
        'get',
        'put',
        'delete',
        'carousel' => [
            'method' => 'POST',
            'path' => '/images/{id}/carousel',
            'controller' => CarouselImageController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'images_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]
    ],
    attributes: [
        "pagination_enabled" => false,
        "pagination_items_per_page" => 20,
        'normalization_context' => ['groups' => ['images_read']],
    ],
)]
class Images
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["travel_read", "images_read", "image_subresource"])]
    private $id;

    /**
     * @Vich\UploadableField(mapping="carousel_image", fileNameProperty="filePath")
     */
    #[Assert\Image(mimeTypes: ['image/jpeg', 'image/png', 'image/webp'], mimeTypesMessage: 'Vous ne pouvez télécharger que du format jpeg, png, webp')]
    #[Groups(['images_object_create'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $filePath;

    #[Groups(["travel_read", "images_read", "image_subresource"])]
    private ?string $fileUrl = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: Travel::class, inversedBy: 'images')]
    #[ApiSubresource(maxDepth:1)]
    #[Groups(["images_read"])]
    private $travels;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getTravels(): ?Travel
    {
        return $this->travels;
    }

    public function setTravels(?Travel $travels): self
    {
        $this->travels = $travels;

        return $this;
    }

    /**
     * @return File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     * @return Images
     */
    public function setFile(?File $file): Images
    {
        $this->file = $file;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    /**
     * @param string|null $fileUrl
     * @return Images
     */
    public function setFileUrl(?string $fileUrl): Images
    {
        $this->fileUrl = $fileUrl;
        return $this;
    }
}
