<?php

declare(strict_types=1);

namespace App\Normalizer;

use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class NullableDateTimeDenormalizer implements DenormalizerInterface
{
    public function __construct(
        private DenormalizerInterface $dateTimeNormalizer
    ) {
    }

    public function denormalize($data, string $type, ?string $format = null, array $context = [])
    {
        return null;
    }

    public function supportsDenormalization($data, string $type, ?string $format = null)
    {
        if ($data === '' || $data === null) {
            return $this->dateTimeNormalizer->supportsDenormalization($data, $type, $format);
        }

        return false;
    }
}
