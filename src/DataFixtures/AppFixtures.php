<?php

namespace App\DataFixtures;

use App\Entity\Location;
use App\Entity\Subtype;
use App\Entity\Type;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $locations_json = file_get_contents('assets/data/locations.json');
        $locations = json_decode($locations_json);

        $types = array_unique(array_column($locations, 'type'));

        foreach ($types as $type) {
            $newType = new Type();
            $newType->setTypeName($type);

            $manager->persist($newType);
        }

        $manager->flush();

        foreach ($locations as $location) {
            $newLocation = new Location();
            $newLocation->setName($location->name);
            $newLocation->setAddress($location->address);
            $newLocation->setLatitude($location->lat);
            $newLocation->setLongitude($location->long);
            $newLocation->setDescription('Ceci est une description de ' . $location->name);
            $type = $manager->getRepository(Type::class)->findOneBy(['type_name' => $location->type]);
            $newLocation->addType($type);

            $manager->persist($newLocation);
        }

        $manager->flush();

        $listnamesubtype = ["Services Municipaux", "Lieu Sportif", "Educations", "Santé", "Lieu Culturel"];
        $listdescsubtype = ["description", "description", "description", "description", "description"];

        $typeRepo = $manager->getRepository(Type::class);
        $alltype = $typeRepo->findAll();

        $selectednumbertype = [6, ];

        for($i = 1; $i<=5; $i++){
            for ($m = 1; $m<=4; $m++){
                $subtype = new Subtype();
                $subtype->setName($listnamesubtype[$i - 1]);
                $subtype->setDescription($listdescsubtype[$i - 1]);
                $subtype->setType($alltype[$i - 1]);

                $manager->persist($subtype);
            }
        }
        $manager->flush();



    }
}
