import { Reaction } from "/server/api";


Reaction.registerPackage({
  label: "Next Reaction",
  name: "next-reaction",
  icon: "fa fa-vine",
  meta: {
    version: "0.1.0"
  },
  autoEnable: true,
  registry: [
    {
      route: "about",
      name: "about",
      template: "aboutUs",
      workflow: "coreWorkflow"
    },
    {
      route: "terms",
      name: "terms",
      template: "termsAndC",
      workflow: "coreWorkflow"
    }
  ],
  layout: [{
    layout: "coreLayoutnextreaction",
    workflow: "coreProductGridWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    priority: 1,
    structure: {
      template: "nextProductsLanding",
      layoutHeader: "layoutHeaderNextReaction",
      layoutFooter: "layoutFooterNextReaction",
      notFound: "productNotFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    } }
  ]
});

