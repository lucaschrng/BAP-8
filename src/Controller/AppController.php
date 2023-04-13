<?php

namespace App\Controller;

use App\Repository\LocationRepository;
use App\Repository\TypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_app')]
    public function index(TypeRepository $typeRepository, LocationRepository $locationRepository ): Response
    {
        return $this->render('app/index.html.twig', [
            'types' => $typeRepository->findAll(),
            'locations' => $locationRepository->findAll(),
        ]);
    }
}