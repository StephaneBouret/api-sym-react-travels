<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CountriesRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CountriesRepository::class)]
#[ApiResource(
    subresourceOperations: [
        'api_continent_countries_get_subresource' => [
            'normalization_context' => [
                'groups' => ['countries_subresource'],
            ],
        ],
        'countries_get_subresource' => [
            'path' => '/countries/{id}/continent',
        ]
    ],
    denormalizationContext: ["disable_type_enforcement" => true],
    itemOperations: ['get', 'delete', 'put'],
    order: ["name" => "ASC"],
    attributes: [
        "pagination_enabled" => false,
        "pagination_items_per_page" => 20,
        'normalization_context' => ['groups' => ['countries_read']],
    ],
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'continent' => 'partial', 'capital' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
class Countries
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $continent;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $capital;

    #[ORM\Column(type: 'integer')]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $population;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $currency;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $iso;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $flagPng;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["countries_read", "destination_read", "continent_read", "countries_subresource"])]
    private $flagSvg;

    #[ORM\ManyToOne(targetEntity: Continent::class, inversedBy: 'country')]
    #[Groups(["countries_read"])]
    private $continents;

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

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(string $continent): self
    {
        $this->continent = $continent;

        return $this;
    }

    public function getCapital(): ?string
    {
        return $this->capital;
    }

    public function setCapital(string $capital): self
    {
        $this->capital = $capital;

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

    public function getIso(): ?string
    {
        return $this->iso;
    }

    public function setIso(string $iso): self
    {
        $this->iso = $iso;

        return $this;
    }

    public function getFlagPng(): ?string
    {
        return $this->flagPng;
    }

    public function setFlagPng(string $flagPng): self
    {
        $this->flagPng = $flagPng;

        return $this;
    }

    public function getFlagSvg(): ?string
    {
        return $this->flagSvg;
    }

    public function setFlagSvg(string $flagSvg): self
    {
        $this->flagSvg = $flagSvg;

        return $this;
    }

    public function getContinents(): ?Continent
    {
        return $this->continents;
    }

    public function setContinents(?Continent $continents): self
    {
        $this->continents = $continents;

        return $this;
    }
}
