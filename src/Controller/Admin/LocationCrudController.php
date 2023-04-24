<?php

namespace App\Controller\Admin;

use App\Entity\Location;
use App\Form\DayFormType;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class LocationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Location::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            TextField::new('address'),
            NumberField::new('latitude')->setNumDecimals(6),
            NumberField::new('longitude')->setNumDecimals(6),
            TextEditorField::new('description'),
            ImageField::new('image')
                ->setBasePath('uploads/images/locations/')
                ->setUploadDir('public/uploads/images/locations/')
                ->setUploadedFileNamePattern('[randomhash].[extension]'),
            AssociationField::new('types'),
            CollectionField::new('horaires')
                ->setLabel('Horaires')
                ->setEntryType(DayFormType::class)
        ];
    }
}
