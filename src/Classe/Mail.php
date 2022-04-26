<?php

namespace App\Classe;

use Mailjet\Client;
use Mailjet\Resources;

Class Mail
{
    private $api_key = '46487990ddd9c585e0c55564dfdec499';
    private $api_key_secret = '36bede7e0e01285f2f38b673217ec86d';

    public function send($to_email, $to_name, $subject, $content)
    {
        $mj = new Client($this->api_key, $this->api_key_secret, true, ['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "sbouret@discommentondit.fr",
                        'Name' => "Dis, comment on dit ?"
                    ],
                    'To' => [
                        [
                            'Email' => $to_email,
                            'Name' => $to_name
                        ]
                    ],
                    'TemplateID' => 3375265,
                    "TemplateLanguage" => true,
                    'Subject' => $subject,
                    'Variables' => [
                        'content' => $content
                    ]
                ]
            ]
        ];
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success() && var_dump($response->getData());
    }
}