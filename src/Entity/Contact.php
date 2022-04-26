<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\SendEmailController;
use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ApiResource(
    denormalizationContext: ["disable_type_enforcement" => true],
    itemOperations: [
        'get',
        'put',
        'delete',
        'post' => [
            'method' => 'POST',
            'path' => '/contacts',
            'controller' => SendEmailController::class,
            'read'=> false,
            'pagination_enabled'=> false,
            'openapi_context' => [
                'summary' => 'Envoi l\'email',
                'description' => 'Enregistre en base l\'email'
            ]
        ]
    ],
    attributes: [
        "pagination_enabled" => false,
        "pagination_items_per_page" => 20,
        'normalization_context' => ['groups' => ['contact_read']],
    ],
)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["contact_read", "destination_read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le prénom est obligatoire")]
    #[Groups(["contact_read", "destination_read"])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le nom est obligatoire")]
    #[Groups(["contact_read", "destination_read"])]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Regex('/^((\+)33|0|0033)[1-9](\d{2}){4}$/', message: "Le téléphone doit avoir un format valide")]
    #[Groups(["contact_read", "destination_read"])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "L'email doit être renseigné'")]
    #[Assert\Email(message: "L'adresse email doit avoir un format valide !")]
    #[Groups(["contact_read", "destination_read"])]
    private $email;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["contact_read", "destination_read"])]
    private $checkInDate;

    #[ORM\Column(type: 'integer')]
    #[Assert\PositiveOrZero(message: "La durée doit être supérieure ou égale à zéro")]
    #[Groups(["contact_read", "destination_read"])]
    private $duration;

    #[ORM\Column(type: 'integer')]
    #[Assert\PositiveOrZero(message: "Le nombre d'adulte doit être supérieur ou égal à zéro")]
    #[Groups(["contact_read", "destination_read"])]
    private $numberAdult;

    #[ORM\Column(type: 'integer')]
    #[Assert\PositiveOrZero(message: "Le nombre d'enfant doit être supérieur ou égal à zéro")]
    #[Groups(["contact_read", "destination_read"])]
    private $numberChildren;

    #[ORM\Column(type: 'float')]
    #[Assert\PositiveOrZero(message: "Votre budget doit être supérieur ou égal à zéro")]
    #[Groups(["contact_read", "destination_read"])]
    private $budget;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "Le message est obligatoire")]
    #[Groups(["contact_read", "destination_read"])]
    private $content;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["contact_read", "destination_read"])]
    private $sendAt;

    #[ORM\ManyToOne(targetEntity: Destination::class, inversedBy: 'contacts')]
    #[Groups(["contact_read"])]
    private $destinations;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCheckInDate(): ?\DateTimeInterface
    {
        return $this->checkInDate;
    }

    public function setCheckInDate(?\DateTimeInterface $checkInDate): self
    {
        $this->checkInDate = $checkInDate;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getNumberAdult(): ?int
    {
        return $this->numberAdult;
    }

    public function setNumberAdult(int $numberAdult): self
    {
        $this->numberAdult = $numberAdult;

        return $this;
    }

    public function getNumberChildren(): ?int
    {
        return $this->numberChildren;
    }

    public function setNumberChildren(int $numberChildren): self
    {
        $this->numberChildren = $numberChildren;

        return $this;
    }

    public function getBudget(): ?float
    {
        return $this->budget;
    }

    public function setBudget(float $budget): self
    {
        $this->budget = $budget;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt(\DateTimeInterface $sendAt): self
    {
        $this->sendAt = $sendAt;

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
