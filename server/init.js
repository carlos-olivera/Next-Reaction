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
});
