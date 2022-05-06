<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\WishImageController;
use App\Repository\WishRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: WishRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['wish_read']],
    collectionOperations: ['get', 'post'],
    itemOperations: [
        'get',
        'post',
        'put', 
        'delete', 
        'patch',
        'image' => [
            'method' => 'POST',
            'path' => '/wishes/{id}/image',
            'controller' => WishImageController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'wish_object_create'],
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
        ],
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
)]
class Wish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['wish_read', 'travel_read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le nom de l'envie est obligatoire")]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'L\'envie doit faire au moins {{ limit }} caractères',
        maxMessage: 'L\'envie ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(['wish_read', 'travel_read'])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['wish_read', 'travel_read'])]
    private $slug;

    /**
     * @Vich\UploadableField(mapping="wishes_image", fileNameProperty="filePath")
     */
    #[Assert\Image(mimeTypes: ['image/jpeg', 'image/png', 'image/webp'], mimeTypesMessage: 'Vous ne pouvez télécharger que du format jpeg, png, webp')]
    #[Groups(['wish_object_create'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $filePath;

    #[Groups(["wish_read", "travel_read"])]
    private ?string $fileUrl = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\ManyToMany(targetEntity: Travel::class, inversedBy: 'wishes')]
    #[Groups(['wish_read'])]
    private $travels;

    public function __construct()
    {
        $this->travels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

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
     * @return Wish
     */
    public function setFile(?File $file): Wish
    {
        $this->file = $file;
        return $this;
    }

    /**
     * @return Collection<int, Travel>
     */
    public function getTravels(): Collection
    {
        return $this->travels;
    }

    public function addTravel(Travel $travel): self
    {
        if (!$this->travels->contains($travel)) {
            $this->travels[] = $travel;
        }

        return $this;
    }

    public function removeTravel(Travel $travel): self
    {
        $this->travels->removeElement($travel);

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
     * @return Wish
     */
    public function setFileUrl(?string $fileUrl): Wish
    {
        $this->fileUrl = $fileUrl;
        return $this;
    }
}
