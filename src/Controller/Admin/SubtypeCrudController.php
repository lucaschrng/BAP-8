<?php

namespace App\Controller\Admin;

use App\Entity\Subtype;
use App\Form\SubcategoryType;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class SubtypeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Subtype::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            CollectionField::new('options')
                ->allowAdd()
                ->setEntryType(SubcategoryType::class)
        ];
    }
}
