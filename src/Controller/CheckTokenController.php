<?php

namespace App\Controller;

use App\Entity\Forget;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CheckTokenController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke($token)
    {
        $now = new \DateTime();
        $data = $this->em->getRepository(Forget::class)->findOneBy(['token' => $token]);
        if (!$data) {
            return false;
        }
        if ($now > $data->getCreatedAt()->modify('+ 3 hour')) {
            return false;
        }

        return $data->getUser();
    }
}
