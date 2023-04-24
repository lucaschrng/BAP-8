<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Form\FormBuilderInterface;

class DayFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('monday', Type\ButtonType::class, [
                'label' => 'Lundi',
            ])
            ->add('monday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('monday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('tuesday', Type\ButtonType::class, [
                'label' => 'Mardi',
            ])
            ->add('tuesday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('tuesday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('wednesday', Type\ButtonType::class, [
                'label' => 'Mercredi',
            ])
            ->add('wednesday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('wednesday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('thursday', Type\ButtonType::class, [
                'label' => 'Jeudi',
            ])
            ->add('thursday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('thursday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('friday', Type\ButtonType::class, [
                'label' => 'Vendredi',
            ])
            ->add('friday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('friday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('saturday', Type\ButtonType::class, [
                'label' => 'Samedi',
            ])
            ->add('saturday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('saturday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('sunday', Type\ButtonType::class, [
                'label' => 'Dimanche',
            ])
            ->add('sunday_open_time', Type\TimeType::class, [
                'label' => 'Ouverture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ])
            ->add('sunday_close_time', Type\TimeType::class, [
                'label' => 'Fermeture',
                'required' => false,
                'placeholder' => 'fermée',
                'empty_data' => 'fermée',
            ]);
    }
}