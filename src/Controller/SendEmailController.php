<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SendEmailController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    
    public function __invoke(Contact $data)
    {
        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}
