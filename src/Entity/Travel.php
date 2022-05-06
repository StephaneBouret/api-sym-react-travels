<?php

namespace App\Entity;

use App\Entity\Destination;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TravelRepository;
use App\Controller\TravelImageController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\AddWishController;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: TravelRepository::class)]
#[ApiResource(
    subresourceOperations: [
        'api_destination_travel_get_subresource' => [
            'normalization_context' => [
                'groups' => ['travel_subresource'],
            ],
        ],
        'destination_get_subresource' => [
            'path' => '/travel/{id}/destination',
        ],
        'images_get_subresource' => [
            'path' => '/travel/{id}/images'
        ],
        'wishes_get_subresource' => [
            'path' => '/travel/{id}/wishes'
        ]
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
    itemOperations: [
        'get',
        'put',
        'delete',
        'image' => [
            'method' => 'POST',
            'path' => '/travel/{id}/image',
            'controller' => TravelImageController::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'travel_object_create'],
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
    attributes: [
        "pagination_enabled" => false,
        "pagination_items_per_page" => 20,
        'normalization_context' => ['groups' => ['travel_read']],
    ],
)]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial', 'type' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['amount'])]
class Travel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le titre du voyage est obligatoire")]
    #[Assert\Type(type: 'string', message: 'Le titre doit être au format texte')]
    #[Assert\Length(
        min: 3,
        max: 255,
        minMessage: 'Le titre doit faire au moins {{ limit }} caractères',
        maxMessage: 'Le titre ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "La description du voyage est obligatoire")]
    #[Assert\Type(type: 'string', message: 'La description doit être au format texte')]
    #[Assert\Length(
        min: 3,
        max: 5000,
        minMessage: 'La description doit faire au moins {{ limit }} caractères',
        maxMessage: 'La description ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le type du voyage est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $type;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: "Le nombre de jours du voyage est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $days;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: "Le nombre de nuits du voyage est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $nights;

    #[ORM\Column(type: 'float')]
    #[Assert\NotBlank(message: "Le prix du voyage est obligatoire")]
    #[Assert\Type(type: 'numeric', message: 'Le prix doit être au format numérique')]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $amount;

    /**
     * @Vich\UploadableField(mapping="travel_image", fileNameProperty="filePath")
     */
    #[Assert\Image(mimeTypes: ['image/jpeg', 'image/png', 'image/webp'], mimeTypesMessage: 'Vous ne pouvez télécharger que du format jpeg, png, webp')]
    #[Groups(['travel_object_create'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $filePath;
    
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private ?string $fileUrl = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: Destination::class, inversedBy: 'travel')]
    #[Groups(["travel_read", "images_read", 'wish_read'])]
    private $destinations;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Les plus sont obligatoires")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $theMost;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "La capacité est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $capacity;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le style est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $style;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "Les loisirs sont obligatoires")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $hobbies;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "La description est obligatoire")]
    #[Assert\Length(
        max: 650,
        maxMessage: 'La description ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $arroundTrip;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "La description est obligatoire")]
    #[Assert\Length(
        max: 650,
        maxMessage: 'La description ne peut excéder plus de {{ limit }} caractères',
    )]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource", 'wish_read'])]
    private $situation;

    #[ORM\OneToMany(mappedBy: 'travels', targetEntity: Images::class)]
    #[ApiSubresource(
        maxDepth: 1,
    )]
    #[Groups(["travel_read"])]
    private $images;

    #[ORM\Column(type: 'decimal', precision: 20, scale: 16)]
    #[Assert\NotBlank(message: "La lattitude est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource"])]
    private $lat;

    #[ORM\Column(type: 'decimal', precision: 20, scale: 16)]
    #[Assert\NotBlank(message: "La longitude est obligatoire")]
    #[Groups(["images_read", "travel_read", "destination_read", "travel_subresource"])]
    private $lng;

    #[ORM\ManyToMany(targetEntity: Wish::class, mappedBy: 'travels')]
    #[Groups(['travel_read'])]
    private $wishes;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->wishes = new ArrayCollection();
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDays(): ?int
    {
        return $this->days;
    }

    public function setDays(int $days): self
    {
        $this->days = $days;

        return $this;
    }

    public function getNights(): ?int
    {
        return $this->nights;
    }

    public function setNights(int $nights): self
    {
        $this->nights = $nights;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    // suppression de float avant $amount afin de forcer le validator au niveau de l'api
    public function setAmount($amount): self
    {
        $this->amount = $amount;

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

    public function getDestinations(): ?Destination
    {
        return $this->destinations;
    }

    public function setDestinations(?Destination $destinations): self
    {
        $this->destinations = $destinations;

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
     * @return Travel
     */
    public function setFile(?File $file): Travel
    {
        $this->file = $file;
        return $this;
    }

    public function getTheMost(): ?string
    {
        return $this->theMost;
    }

    public function setTheMost(?string $theMost): self
    {
        $this->theMost = $theMost;

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
     * @return Travel
     */
    public function setFileUrl(?string $fileUrl): Travel
    {
        $this->fileUrl = $fileUrl;
        return $this;
    }

    public function getCapacity(): ?string
    {
        return $this->capacity;
    }

    public function setCapacity(string $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getStyle(): ?string
    {
        return $this->style;
    }

    public function setStyle(string $style): self
    {
        $this->style = $style;

        return $this;
    }

    public function getHobbies(): ?string
    {
        return $this->hobbies;
    }

    public function setHobbies(string $hobbies): self
    {
        $this->hobbies = $hobbies;

        return $this;
    }

    public function getArroundTrip(): ?string
    {
        return $this->arroundTrip;
    }

    public function setArroundTrip(string $arroundTrip): self
    {
        $this->arroundTrip = $arroundTrip;

        return $this;
    }

    public function getSituation(): ?string
    {
        return $this->situation;
    }

    public function setSituation(string $situation): self
    {
        $this->situation = $situation;

        return $this;
    }

    /**
     * @return Collection<int, Images>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Images $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setTravels($this);
        }

        return $this;
    }

    public function removeImage(Images $image): self
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getTravels() === $this) {
                $image->setTravels(null);
            }
        }

        return $this;
    }

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?string
    {
        return $this->lng;
    }

    public function setLng(string $lng): self
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * @return Collection<int, Wish>
     */
    public function getWishes(): Collection
    {
        return $this->wishes;
    }

    public function addWish(Wish $wish): self
    {
        if (!$this->wishes->contains($wish)) {
            $this->wishes[] = $wish;
            $wish->addTravel($this);
        }

        return $this;
    }

    public function removeWish(Wish $wish): self
    {
        if ($this->wishes->removeElement($wish)) {
            $wish->removeTravel($this);
        }

        return $this;
    }
}
