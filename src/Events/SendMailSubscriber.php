<?php

namespace App\Events;

use App\Entity\Contact;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class SendMailSubscriber implements EventSubscriberInterface
{
    protected $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event)
    {
        $contact = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$contact instanceOf Contact || Request::METHOD_POST !== $method) {
            return;
        }

        $message = new TemplatedEmail();
        $message
            ->from(new Address("sbouret@discommentondit.fr", "Infos du site App Travel"))
            ->to('contact@discommentondit.com')
            ->subject('Un nouveau devis vient d\'arriver')
            ->htmlTemplate('emails/devis_success.html.twig')
            ->context([
                'contact' => $contact,
            ]);
        
        $this->mailer->send($message);
    }
}