const steps = (t) => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: t('guide.guideTitle'),
        description: t('guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: t('guide.sidebarTitle'),
        description: t('guide.sidebarDesc'),
        position: 'right-center'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: t('guide.hamburgerTitle'),
        description: t('guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: t('guide.breadcrumbTitle'),
        description: t('guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: t('guide.tagTitle'),
        description: t('guide.tagDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: t('guide.searchTitle'),
        description: t('guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: t('guide.fullTitle'),
        description: t('guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-size',
      popover: {
        title: t('guide.sizeTitle'),
        description: t('guide.sizeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: t('guide.langTitle'),
        description: t('guide.langDesc'),
        position: 'bottom-right'
      }
    }
  ]
}

export default steps
