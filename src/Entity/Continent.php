<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ContinentRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\ContinentImageController;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\FindContinentBySlug;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: ContinentRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['continent_read']],
    collectionOperations: ['get', 'post'],
    itemOperations: [
        'get', 
        'delete', 
        'put',
        'get_slugContinent' => [
            'method' => 'GET',
            'path' => '/continents/{slugContinent}/continent',
            'controller' => FindContinentBySlug::class,
            'read'=> false,
        ],
        'image' => [
            'method' => 'POST',
            'path' => '/continents/{id}/image',
            'controller' => ContinentImageController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'continent_object_create'],
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
    subresourceOperations: [
        'countries_get_subresource' => [
            'path' => '/continents/{id}/countries',
        ]
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
#[ApiFilter(OrderFilter::class)]
class Continent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['continent_read', "countries_read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le nom du continent est obligatoire")]
    #[Assert\Type(type: 'string', message: 'Le nom doit être au format texte')]
    #[Groups(['continent_read', "countries_read"])]
    private $name;

    /**
     * @Vich\UploadableField(mapping="continent_image", fileNameProperty="filePath")
     */
    #[Assert\Image(mimeTypes: ['image/jpeg', 'image/png', 'image/webp'], mimeTypesMessage: 'Vous ne pouvez télécharger que du format jpeg, png, webp')]
    #[Groups(['continent_object_create'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $filePath;

    #[Groups(['continent_read', "countries_read"])]
    private ?string $fileUrl = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\OneToMany(mappedBy: 'continents', targetEntity: Countries::class)]
    #[Groups(['continent_read'])]
    #[ApiSubresource]
    private $country;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['continent_read', "countries_read"])]
    private $slug;

    public function __construct()
    {
        $this->country = new ArrayCollection();
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

    /**
     * @return Collection<int, Countries>
     */
    public function getCountry(): Collection
    {
        return $this->country;
    }

    public function addCountry(Countries $country): self
    {
        if (!$this->country->contains($country)) {
            $this->country[] = $country;
            $country->setContinents($this);
        }

        return $this;
    }

    public function removeCountry(Countries $country): self
    {
        if ($this->country->removeElement($country)) {
            // set the owning side to null (unless already changed)
            if ($country->getContinents() === $this) {
                $country->setContinents(null);
            }
        }

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
     * @return Continent
     */
    public function setFile(?File $file): Continent
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
     * @return Continent
     */
    public function setFileUrl(?string $fileUrl): Continent
    {
        $this->fileUrl = $fileUrl;
        return $this;
    }
}
