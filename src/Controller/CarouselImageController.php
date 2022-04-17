<?php

namespace App\Controller;

use App\Entity\Images;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class CarouselImageController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $image = $request->attributes->get('data');
        if (!($image instanceof Images)) {
            throw new BadRequestHttpException('Voyage attendu');
        }

        $image->setFile($request->files->get('file'));
        $image->setUpdatedAt(new \Datetime());
        return $image;
    }
}