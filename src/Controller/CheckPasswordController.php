<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CheckPasswordController extends AbstractController
{
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function __invoke($password)
    {
        $user = $this->getUser();
        $data = $this->encoder->isPasswordValid($user, $password);

        return $data;
    }
}
