<?php

namespace App\Controller;

use App\Entity\Destination;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FindDestinationByContinent extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    
    public function __invoke($slug)
    {
        $slug = $this->em->getRepository(Destination::class)->findBy(['slug' => $slug]);
        return $slug;
    }
}