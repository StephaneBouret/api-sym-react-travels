<?php

namespace App\Controller;

use App\Entity\Wish;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class WishImageController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $wish = $request->attributes->get('data');
        if (!($wish instanceof Wish)) {
            throw new BadRequestHttpException('Envie attendu');
        }
        
        $wish->setFile($request->files->get('file'));
        $wish->setUpdatedAt(new \Datetime());

        return $wish;
    }
}
