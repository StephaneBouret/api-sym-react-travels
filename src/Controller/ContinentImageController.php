<?php

namespace App\Controller;

use App\Entity\Continent;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ContinentImageController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $continent = $request->attributes->get('data');
        if (!($continent instanceof Continent)) {
            throw new BadRequestHttpException('Continent attendu');
        }

        $continent->setFile($request->files->get('file'));
        $continent->setUpdatedAt(new \Datetime());
        return $continent;
    }
}