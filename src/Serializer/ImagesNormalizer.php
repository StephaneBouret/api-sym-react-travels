<?php

namespace App\Serializer;

use App\Entity\Images;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

class ImagesNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    public function __construct(private StorageInterface $storage)
    {
        
    }

    private const ALREADY_CALLED = 'AppImagesNormalizerAlreadyCalled';

    /**
     * @param Images $object
     */
    public function normalize(mixed $object, ?string $format = null, array $context = [])
    {
        $context[self::ALREADY_CALLED] = true;
        // $object->setFilePath($this->storage->resolveUri($object, 'file'));
        $object->setFileUrl($this->storage->resolveUri($object, 'file'));
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return !isset($context[self::ALREADY_CALLED]) && $data instanceof Images;
    }
}