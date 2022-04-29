<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CheckEmailController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email', message: "Un utilisateur ayant cette adresse email existe déjà")]
#[ApiResource(
    normalizationContext: ['groups' => ['users_read']],
    itemOperations: [
        'get',
        'put',
        'delete',
        'check_email' => [
            'method' => 'GET',
            'path' => '/forgetpassword/{email}/check_email',
            'controller' => CheckEmailController::class,
            'read'=> false,
            'pagination_enabled'=> false,
            'openapi_context' => [
                'summary' => 'Vérifie si email existe dans la BDD',
                'description' => 'Vérifie si email existe dans la BDD'
            ]
        ],
    ],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["travel_read", "destination_read", "travel_subresource", "users_read", "forgets_read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: "L'email doit être renseigné")]
    #[Assert\Email(message: "L'adresse email doit avoir un format valide !")]
    #[Groups(["travel_read", "destination_read", "travel_subresource", "users_read", "forgets_read"])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["travel_read", "destination_read", "travel_subresource", "users_read"])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank(message: "Le mot de passe est obligatoire")]
    #[Assert\Regex(
        pattern: "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/m",
        message: "Votre mot de passe doit contenir au moins 1 chiffre, 1 lettre en minuscule, 1 lettre en majuscule, 1 caractère spécial et contenir au moins 8 caractères"
    )]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le prénom est obligatoire")]
    #[Assert\Length(min: 3, max: 255, minMessage: "Le prénom doit faire plus de 3 caractères", maxMessage: "Le prénom doit faire moins de 255 caractères")]
    #[Groups(["travel_read", "destination_read", "travel_subresource", "users_read", "forgets_read"])]
    private $firstName;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le nom de famille est obligatoire")]
    #[Assert\Length(min: 3, max: 255, minMessage: "Le nom de famille doit faire plus de 3 caractères", maxMessage: "Le nom de famille doit faire moins de 255 caractères")]
    #[Groups(["travel_read", "destination_read", "travel_subresource", "users_read", "forgets_read"])]
    private $lastName;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Forget::class)]
    private $forgets;

    public function __construct()
    {
        $this->forgets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Forget>
     */
    public function getForgets(): Collection
    {
        return $this->forgets;
    }

    public function addForget(Forget $forget): self
    {
        if (!$this->forgets->contains($forget)) {
            $this->forgets[] = $forget;
            $forget->setUser($this);
        }

        return $this;
    }

    public function removeForget(Forget $forget): self
    {
        if ($this->forgets->removeElement($forget)) {
            // set the owning side to null (unless already changed)
            if ($forget->getUser() === $this) {
                $forget->setUser(null);
            }
        }

        return $this;
    }
}
