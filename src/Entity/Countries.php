<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CountriesRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CountriesRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['country_read']],
    collectionOperations: ['get', 'post'],
    itemOperations: ['get', 'delete', 'put'],
    denormalizationContext: ["disable_type_enforcement" => true],
    order: ["name" => "ASC"],
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'continent' => 'partial', 'capital' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['name'])]
class Countries
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["country_read", "destination_read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $continent;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $capital;

    #[ORM\Column(type: 'integer')]
    #[Groups(["country_read", "destination_read"])]
    private $population;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $currency;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $iso;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $flagPng;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["country_read", "destination_read"])]
    private $flagSvg;

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
}
