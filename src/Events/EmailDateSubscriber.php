<?php

namespace App\Events;

use App\Repository\ContactRepository;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Contact;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class EmailDateSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDateForEmail', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setDateForEmail(ViewEvent $event)
    {
        $email = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($email instanceof Contact && $method === "POST") {
           if (empty($email->getSendAt())) {
               $email->setSendAt(new \Datetime());
           }
        }
    }
}
