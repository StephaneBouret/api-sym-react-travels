<?php

namespace App\Entity;

use App\Repository\CountriesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CountriesRepository::class)]
class Countries
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $continent;

    #[ORM\Column(type: 'string', length: 255)]
    private $capital;

    #[ORM\Column(type: 'integer')]
    private $population;

    #[ORM\Column(type: 'string', length: 255)]
    private $currency;

    #[ORM\Column(type: 'string', length: 255)]
    private $iso;

    #[ORM\Column(type: 'string', length: 255)]
    private $flagPng;

    #[ORM\Column(type: 'string', length: 255)]
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
