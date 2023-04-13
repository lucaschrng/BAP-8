<?php

namespace App\Controller\Admin;

use App\Entity\Subtype;
use App\Entity\Type;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(LocationCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('BAP08');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('The Locations', 'fa fa-home');
        yield MenuItem::linkToCrud('The Subtypes', 'fas fa-list', Subtype::class);
        yield MenuItem::linkToCrud('The Label', 'fas fa-list', Type::class);
    }
}
