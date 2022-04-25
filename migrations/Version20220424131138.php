<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220424131138 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE destination ADD continents_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE destination ADD CONSTRAINT FK_3EC63EAA298246F6 FOREIGN KEY (continents_id) REFERENCES continent (id)');
        $this->addSql('CREATE INDEX IDX_3EC63EAA298246F6 ON destination (continents_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE destination DROP FOREIGN KEY FK_3EC63EAA298246F6');
        $this->addSql('DROP INDEX IDX_3EC63EAA298246F6 ON destination');
        $this->addSql('ALTER TABLE destination DROP continents_id');
    }
}
