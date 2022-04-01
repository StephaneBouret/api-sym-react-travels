<?php

namespace App\Controller;

use App\Entity\Travel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class TravelImageController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $travel = $request->attributes->get('data');
        if (!($travel instanceof Travel)) {
            throw new BadRequestHttpException('Voyage attendu');
        }

        $travel->setFile($request->files->get('file'));
        $travel->setUpdatedAt(new \Datetime());
        return $travel;
    }
}