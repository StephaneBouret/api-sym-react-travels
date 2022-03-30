<?php

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // dd($event);
        // 1. Récupérer l'utilisateur (pour avoir son firstName, son lastName...)
        /** @var User */
        $user = $event->getUser();

        // 2. Enrichir les datas pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $data['id'] = $user->getId();

        $event->setData($data);
    }
}