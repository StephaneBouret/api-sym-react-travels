<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\DestinationRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\DestinationImageController;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: DestinationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['destination_read']],
    collectionOperations: ['get', 'post'],
    itemOperations: [
        'get', 
        'delete', 
        'put',
        'image' => [
            'method' => 'POST',
            'path' => '/destinations/{id}/image',
            'controller' => DestinationImageController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'destination_object_create'],
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
    subresourceOperations: [
        'travel_get_subresource' => [
            'path' => '/destination/{id}/travel',
        ]
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
)]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial', 'country' => 'partial', 'city' => 'partial'])]
#[ApiFilter(OrderFilter::class)]
class Destination
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["destination_read", "travel_read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le titre de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'Le titre doit être au format texte')]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'Le titre doit faire au moins {{ limit }} caractères',
        maxMessage: 'Le titre ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["destination_read", "travel_read"])]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "La description de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'La description doit être au format texte')]
    #[Assert\Length(
        min: 3,
        max: 5000,
        minMessage: 'La description doit faire au moins {{ limit }} caractères',
        maxMessage: 'La description ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["destination_read", "travel_read"])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le pays de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'Le pays doit être au format texte')]
    #[Groups(["destination_read", "travel_read"])]
    private $country;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "La ville de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'La ville doit être au format texte')]
    #[Groups(["destination_read", "travel_read"])]
    private $city;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le continent de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'Le continent doit être au format texte')]
    #[Groups(["destination_read", "travel_read"])]
    private $continent;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: "La population de la destination est obligatoire")]
    #[Assert\Type(type: 'numeric', message: 'La population doit être au format numérique')]
    #[Groups(["destination_read", "travel_read"])]
    private $population;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "La monnaie de la destination est obligatoire")]
    #[Assert\Type(type: 'string', message: 'La monnaie doit être au format texte')]
    #[Groups(["destination_read", "travel_read"])]
    private $currency;

    /**
     * @Vich\UploadableField(mapping="destination_image", fileNameProperty="filePath")
     */
    #[Groups(['destination_object_create'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["destination_read", "travel_read"])]
    private $filePath;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\OneToMany(mappedBy: 'destinations', targetEntity: Travel::class)]
    #[Groups(["destination_read"])]
    #[ApiSubresource]
    private $travel;

    public function __construct()
    {
        $this->travel = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(string $continent): self
    {
        $this->continent = $continent;

        return $this;
    }

    public function getPopulation(): ?int
    {
        return $this->population;
    }

    public function setPopulation(int $population): self
    {
        $this->population = $population;

        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): self
    {
        $this->currency = $currency;

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
     * @return Collection<int, Travel>
     */
    public function getTravel(): Collection
    {
        return $this->travel;
    }

    public function addTravel(Travel $travel): self
    {
        if (!$this->travel->contains($travel)) {
            $this->travel[] = $travel;
            $travel->setDestinations($this);
        }

        return $this;
    }

    public function removeTravel(Travel $travel): self
    {
        if ($this->travel->removeElement($travel)) {
            // set the owning side to null (unless already changed)
            if ($travel->getDestinations() === $this) {
                $travel->setDestinations(null);
            }
        }

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
    * @return Destination
    */
    public function setFile(?File $file): Destination
    {
        $this->file = $file;
        return $this;
    }
}
