<?php

namespace App\Controller;

use App\Entity\Destination;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class DestinationImageController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $destination = $request->attributes->get('data');
        if (!($destination instanceof Destination)) {
            throw new BadRequestHttpException('Destination attendue');
        }

        $destination->setFile($request->files->get('file'));
        $destination->setUpdatedAt(new \Datetime());
        return $destination;
    }
}