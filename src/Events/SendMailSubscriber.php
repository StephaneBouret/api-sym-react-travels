<?php

namespace App\Events;

use App\Classe\Mail;
use App\Entity\Contact;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

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

        // Méthode par classe Mail Mailjet
        $date = $contact->getCheckInDate();
        if (empty($date)) {
            $date = "Aucune date prévue";
        } else {
            $date = $contact->getCheckInDate()->format('d-m-Y');
        }
        
        $content = "<p>Bonjour<br/>Vous venez de recevoir un nouveau devis</p><br/>";
        $content .= "<strong>Prénom : </strong>".ucwords($contact->getFirstname())."<br/>";
        $content .= "<strong>Nom : </strong>".mb_strtoupper($contact->getLastname())."<br/>";
        $content .= "<strong>Téléphone : </strong>".$contact->getPhone()."<br/>";
        $content .= "<strong>Email : </strong>".$contact->getEmail()."<br/>";
        $content .= "<strong>Date de départ souhaitée : </strong>".$date."<br/>";
        $content .= "<strong>Durée souhaitée (nuits) : </strong>".$contact->getDuration()."<br/>";
        $content .= "<strong>Nombre d'adultes envisagé : </strong>".$contact->getNumberAdult()."<br/>";
        $content .= "<strong>Nombre d'enfants envisagé : </strong>".$contact->getNumberChildren()."<br/>";
        $content .= "<strong>Budget prévu par personne : </strong>".$contact->getBudget()." €<br/>";
        $content .= "<strong>Destination envisagée : </strong>".$contact->getDestinations()->getCountry()."<br/>";
        $content .="<br/><strong>Commentaires : </strong><br/><p>".$contact->getContent()."</p>";

        $mail = new Mail;
        $mail->send('contact@discommentondit.com', 'Administrateur', 'Un nouveau devis vient d\'arriver', $content);

        // Méthode par symfony mail
        // $message = new TemplatedEmail();
        // $message
        //     ->from(new Address("contact@discommentondit.fr", "Infos du site App Travel"))
        //     ->to('contact@discommentondit.com')
        //     ->subject('Un nouveau devis vient d\'arriver')
        //     ->htmlTemplate('emails/devis_success.html.twig')
        //     ->context([
        //         'contact' => $contact,
        //     ]);
        
        // $this->mailer->send($message);
    }
}