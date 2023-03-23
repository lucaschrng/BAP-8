<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LocationRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => 'location:item']),
        new GetCollection(normalizationContext: ['groups' => 'location:list'])
    ],
    order: ['id' => 'DESC'],
    paginationEnabled: false,
)]
class Location
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['location:list', 'location:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['location:list', 'location:item'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['location:list', 'location:item'])]
    private $address = null;

    #[ORM\Column]
    #[Groups(['location:list', 'location:item'])]
    private ?float $latitude = null;

    #[ORM\Column]
    #[Groups(['location:list', 'location:item'])]
    private ?float $longitude = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['location:list', 'location:item'])]
    private $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['location:list', 'location:item'])]
    private ?string $image = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['location:list', 'location:item'])]
    private array $horaires = [];

    #[ORM\OneToMany(mappedBy: 'loc', targetEntity: Review::class, orphanRemoval: true)]
    #[Groups(['location:list', 'location:item'])]
    private Collection $messages;

    #[ORM\ManyToMany(targetEntity: Type::class, inversedBy: 'locations')]
    #[Groups(['location:list', 'location:item'])]
    private Collection $types;

    #[Groups(['location:list', 'location:item'])]
    private array $typesIds = [];

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->types = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function setAddress($address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getHoraires(): array
    {
        return $this->horaires;
    }

    public function setHoraires(?array $horaires): self
    {
        $this->horaires = $horaires;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Review $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setLieu($this);
        }

        return $this;
    }

    public function removeMessage(Review $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getLieu() === $this) {
                $message->setLieu(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Type>
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(Type $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types->add($type);
        }

        return $this;
    }

    public function removeType(Type $type): self
    {
        $this->types->removeElement($type);

        return $this;
    }

    public function getTypesIds(): ?array
    {
        $this->typesIds = [];
        foreach ($this->types as $type) {
            $this->typesIds[] = $type->getId();
        }
        return $this->typesIds;
    }
}
