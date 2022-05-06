<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220505071923 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE wish (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, cat JSON NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE wish_travel (wish_id INT NOT NULL, travel_id INT NOT NULL, INDEX IDX_1218CE0B42B83698 (wish_id), INDEX IDX_1218CE0BECAB15B3 (travel_id), PRIMARY KEY(wish_id, travel_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE wish_travel ADD CONSTRAINT FK_1218CE0B42B83698 FOREIGN KEY (wish_id) REFERENCES wish (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE wish_travel ADD CONSTRAINT FK_1218CE0BECAB15B3 FOREIGN KEY (travel_id) REFERENCES travel (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE wish_travel DROP FOREIGN KEY FK_1218CE0B42B83698');
        $this->addSql('DROP TABLE wish');
        $this->addSql('DROP TABLE wish_travel');
    }
}
