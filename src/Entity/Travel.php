<?php

namespace App\Entity;

use App\Entity\Destination;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TravelRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

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
        ]
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
    itemOperations: [
        'get',
        'put',
        'delete',
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
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
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
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
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
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le type du voyage est obligatoire")]
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $type;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: "Le nombre de jours du voyage est obligatoire")]
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $days;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: "Le nombre de nuits du voyage est obligatoire")]
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $nights;

    #[ORM\Column(type: 'float')]
    #[Assert\NotBlank(message: "Le prix du voyage est obligatoire")]
    #[Assert\Type(type: 'numeric', message: 'Le prix doit être au format numérique')]
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $amount;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["travel_read", "destination_read", "travel_subresource"])]
    private $filePath;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: Destination::class, inversedBy: 'travel')]
    #[Groups(["travel_read"])]
    private $destinations;

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
}
