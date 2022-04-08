<?php

namespace App\Controller;

use App\Entity\Continent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FindContinentBySlug extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    
    public function __invoke($slugContinent)
    {
        $slugContinent = $this->em->getRepository(Continent::class)->findBy(['slug' => $slugContinent]);
        return $slugContinent;
    }
}