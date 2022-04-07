<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220407085210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE countries ADD continents_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE countries ADD CONSTRAINT FK_5D66EBAD298246F6 FOREIGN KEY (continents_id) REFERENCES continent (id)');
        $this->addSql('CREATE INDEX IDX_5D66EBAD298246F6 ON countries (continents_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE countries DROP FOREIGN KEY FK_5D66EBAD298246F6');
        $this->addSql('DROP INDEX IDX_5D66EBAD298246F6 ON countries');
        $this->addSql('ALTER TABLE countries DROP continents_id');
    }
}
