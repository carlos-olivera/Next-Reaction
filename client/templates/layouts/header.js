import { Reaction } from "/client/api";
import { Tags } from "/lib/collections";
import { Session } from "meteor/session";

/**
 * layoutHeader events
 */
 Template.layoutHeaderNextReaction.events({
  "click .navbar-accounts .dropdown-toggle": function () {
    return setTimeout(function () {
      return $("#login-email").focus();
    }, 100);
  },
  "click .header-tag, click .navbar-brand": function () {
    Session.set("filteRcompatibility", "");
    return $(".dashboard-navbar-packages ul li").removeClass("active");
  }
});

 Template.layoutHeaderNextReaction.helpers({
  TagNav() {
    return ReactionUI.TagNav.Components.TagNav;
  },

  coreNavProps() {
    const instance = Template.instance();
    return {
      onMenuButtonClick() {
       instance.toggleMenuCallback();
     }
   };
 },

 tagNavProps() {
  const instance = Template.instance();

  const tags = Tags.find({
    isTopLevel: true
  }, {
    sort: {
      position: 1
    }
  }).fetch();

  return {
    name: "coreHeaderNavigation",
    editable: Reaction.hasAdminAccess(),
    tags: tags,
    onToggleMenu(callback) {
      instance.toggleMenuCallback = callback;
    }
  };
}
});