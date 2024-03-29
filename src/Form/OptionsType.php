<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class OptionsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('option_name', TextType::class, [
                'label' => 'Option name',
            ])
            ->add('query', TextType::class, [
                'label' => 'Query',
            ]);
    }
}