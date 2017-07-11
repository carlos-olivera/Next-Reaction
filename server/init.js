import { check } from "meteor/check";
import { Packages, Shops } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";


function addRolesToVisitors() {
  Logger.info("::: Adding about route permissions to default roles");
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "about" }
  });
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "about" }
  });
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "terms" }
  });
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "terms" }
  });
}

function changeHeaderAndFooter(){

  Packages.update(
    {
        $or:[{"layout.0.structure.layoutHeader":"layoutHeader"},{"layout.0.structure.layoutHeader":"checkoutHeader"}]
    },
    { $set: {
        "layout.0.structure.layoutFooter":"layoutFooterNextReaction",
        "layout.0.structure.layoutHeader":"layoutHeaderNextReaction"
    }},
    {
        "multi" : true,  
        "upsert" : false  
    }
    );
}

function changeLayouts(shopId, newLayout) {
  check(shopId, String);
  check(newLayout, String);
  Logger.info(`::: changing all layouts to ${newLayout}`);
  const shop = Shops.findOne(shopId);
  for (let i = 0; i < shop.layout.length; i++) {
    shop.layout[i].layout = newLayout;
  }
  return Shops.update(shopId, {
    $set: { layout: shop.layout }
  });
}

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
  changeLayouts(Reaction.getShopId(), "coreLayoutnextreaction");
  changeHeaderAndFooter();
});
