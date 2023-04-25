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

        $list_image_location=["https://static.actu.fr/uploads/2020/01/capture-d-ecran-2020-01-15-a-002813.png","https://maville.com/photosmvi/2021/01/27/P24515945D4472810G.jpg","https://cdn.discordapp.com/attachments/1024340270675927160/1100341301909655622/image6.PNG","https://maisondesarts.plessis-robinson.com/sites/default/files/banner/mediatheque_maison_des_arts_0.jpg","https://www.hauts-de-seine.fr/fileadmin/_processed_/5/e/csm_BoisGarenne_9747b9bcbd.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ch%C3%A2teau_de_la_Solitude_%2815361224669%29.jpg/800px-Ch%C3%A2teau_de_la_Solitude_%2815361224669%29.jpg","https://www.plessis-robinson.com/uploads/media/cite-jardin_01.jpg","https://i.skyrock.net/9844/60229844/pics/3011381733_1_3_SmzC9UIE.jpg","https://www.plessis-robinson.com/uploads/pics/jardins_mairie.jpg","https://lavilledurable.plessis-robinson.com/wp-content/uploads/2017/02/arbres.jpg"];
        $re=0;
        foreach ($locations as $location) {
            $newLocation = new Location();
            $newLocation->setName($location->name);
            $newLocation->setAddress($location->address);
            $newLocation->setLatitude($location->lat);
            $newLocation->setLongitude($location->long);
            $newLocation->setDescription('Ceci est une description de ' . $location->name);
            $type = $manager->getRepository(Type::class)->findOneBy(['type_name' => $location->type]);
            $newLocation->addType($type);
            if ($re<10){
                $newLocation->setImage($list_image_location[$re]);
                $re++;
            }
            else{
                $newLocation->setImage("Image a remplir ici");
            }
            $manager->persist($newLocation);
        }

        $manager->flush();

//        $listnamesubtype = ["Services Municipaux", "Lieu Sportif", "Educations", "Santé", "Lieu Culturel"];
//        $listdescsubtype = ["description", "description", "description", "description", "description"];
//
//        $typeRepo = $manager->getRepository(Type::class);
//        $alltype = $typeRepo->findAll();
//
//        $selectednumbertype = [6, ];
//
//        for($i = 1; $i<=5; $i++){
//            for ($m = 1; $m<=4; $m++){
//                $subtype = new Subtype();
//                $subtype->setName($listnamesubtype[$i - 1]);
//                $subtype->setDescription($listdescsubtype[$i - 1]);
//                $subtype->setType($alltype[$i - 1]);
//
//                $manager->persist($subtype);
//            }
//        }

        $data = [
            "services municipaux" => [
                [
                    "options" => [
                        [
                            "query" => "mairie",
                            "option_name" => "carte électoral"
                        ]
                    ],
                    "subcategory" => "senior"
                ],
                [
                    "options" => [
                        [
                            "query" => "mairie",
                            "option_name" => "passeport"
                        ]
                    ],
                    "subcategory" => "famille"
                ],
                [
                    "options" => [
                        [
                            "query" => "mairie",
                            "option_name" => "recensement"
                        ]
                    ],
                    "subcategory" => "jeune"
                ],
                [
                    "options" => [
                        [
                            "query" => "mairie",
                            "option_name" => "carte d’identité"
                        ]
                    ],
                    "subcategory" => "nouvel habitant"
                ]
            ],
            "santé" => [
                [
                    "options" => [],
                    "subcategory" => "centres médicaux"
                ],
                [
                    "options" => [],
                    "subcategory" => "planning familial"
                ],
                [
                    "options" => [],
                    "subcategory" => "pharmacie"
                ],
                [
                    "options" => [],
                    "subcategory" => "hôpitaux"
                ],
                [
                    "options" => [],
                    "subcategory" => "médecin"
                ]
            ],
            "lieu culturel" => [],
            "éducations" => [
                [
                    "options" => [
                        [
                            "query" => "lycée",
                            "option_name" => "lycée"
                        ]
                    ],
                    "subcategory" => "-3 ans"
                ],
                [
                    "options" => [
                        [
                            "query" => "école",
                            "option_name" => "conseiller d’orientation"
                        ]
                    ],
                    "subcategory" => "3-6 ans"
                ],
                [
                    "options" => [],
                    "subcategory" => "6-10 ans"
                ],
                [
                    "options" => [],
                    "subcategory" => "10-15 ans"
                ],
                [
                    "options" => [],
                    "subcategory" => "+15 ans"
                ]
            ],
            "lieux sportifs" => [
                [
                    "options" => [],
                    "subcategory" => "sport d’équipe"
                ],
                [
                    "options" => [],
                    "subcategory" => "sport individuel"
                ],
                [
                    "options" => [],
                    "subcategory" => "sport d’interieur"
                ],
                [
                    "options" => [],
                    "subcategory" => "sport d’extérieur"
                ]
            ]
        ];

        $list_images=["https://cdn.discordapp.com/attachments/1073173059017642034/1100332738667630592/pascal-bernardon-u5wJWy2Ji0k-unsplash_1.jpg","https://cdn.discordapp.com/attachments/1073173059017642034/1100332741461037066/joliotcurie-070-red-jpg_1.jpg","https://cdn.discordapp.com/attachments/1073173059017642034/1100332723014475896/allegria_culture_1.jpg","https://cdn.discordapp.com/attachments/1073173059017642034/1100332721701670962/jared-rice-NTyBbu66_SI-unsplash_1.jpg","https://cdn.discordapp.com/attachments/1073173059017642034/1100332724906119178/brooke-cagle-g1Kr4Ozfoac-unsplash_1.jpg"];

        $rec=0;
        foreach ($data as $subtype => $options) {
            $newSubtype = new Subtype();
            $newSubtype->setName($subtype);
            $newSubtype->setOptions($options);
            $newSubtype->setImageUrl($list_images[$rec]);
            $rec++;

            $manager->persist($newSubtype);
        }

        $manager->flush();
    }
}
