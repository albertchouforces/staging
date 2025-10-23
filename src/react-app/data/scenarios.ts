import { Scenario } from '@/react-app/types';

export const scenarios: Scenario[] = [
  {
    id: "mooring-boat",
    knot: "cleat-hitch",
    use: "Securing a vessel to a dock",
    scenario: "You need to secure your boat to a dock cleat during a rising tide where the water level will change significantly over several hours.",
    why: "The cleat hitch is ideal for securing boats to docks as it creates a secure attachment that can hold under changing tension. It's designed to not slip when properly tied, yet can be quickly released when needed."
  },
  {
    id: "anchor-line",
    knot: "anchor-hitch",
    use: "Attaching a line to an anchor",
    scenario: "You're preparing to drop anchor in a cove with a rocky bottom, and need to ensure the anchor line won't come loose under repeated strain.",
    why: "The anchor hitch creates a secure connection that won't slip under load and resists the jerking motion that occurs when a boat rides at anchor, especially in changing conditions."
  },
  {
    id: "rescue-operation",
    knot: "bowline",
    use: "Creating a secure loop for rescue",
    scenario: "A crew member has fallen overboard and needs to be pulled back onto the vessel safely.",
    why: "The bowline creates a fixed loop that won't tighten or constrict when put under load, making it ideal for rescue situations. It's also easily tied with one hand if necessary."
  },
  {
    id: "joining-lines",
    knot: "sheet-bend",
    use: "Joining two ropes of different diameters",
    scenario: "You need to extend a tow line with a rope of a different thickness to reach a disabled vessel.",
    why: "The sheet bend is specifically designed to securely join ropes of different diameters or materials. It's more reliable than a reef knot when connecting lines of unequal sizes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "temporary-mooring",
    knot: "clove-hitch",
    use: "Quick temporary fastening",
    scenario: "You need to temporarily secure your boat to a piling while waiting for a dock to clear.",
    why: "The clove hitch can be quickly tied and adjusted, making it perfect for temporary mooring. It's easy to untie even after being under load, allowing for quick departure when needed."
  },
  {
    id: "secure-cargo",
    knot: "truckers-hitch",
    use: "Securing loads with tension",
    scenario: "You need to tie down equipment on the deck that must remain absolutely secure during rough seas.",
    why: "The trucker's hitch creates a mechanical advantage, allowing you to apply and maintain significant tension on the line. This makes it ideal for securing loads that must not shift."
  },
  {
    id: "preventing-fraying",
    knot: "stopper-knot",
    use: "Preventing rope from unraveling or slipping through a fairlead",
    scenario: "You notice a jib sheet is starting to run through a fairlead as the wind increases.",
    why: "A stopper knot creates a bulky end that prevents a line from completely running through a block, fairlead, or other hardware, preventing potential equipment damage or loss of control."
  },
  {
    id: "tensioning-line",
    knot: "rolling-hitch",
    use: "Attaching a line to take strain off another line",
    scenario: "A dockline is under heavy strain during strong winds, and you need to take some pressure off to adjust it.",
    why: "The rolling hitch allows you to attach a line to another line under tension. Unlike other knots, it grips well even when the host line is slippery or under load."
  },
  {
    id: "bundling-equipment",
    knot: "reef-knot",
    use: "Binding and bundling items together",
    scenario: "You need to bundle some spare lines together for storage below deck.",
    why: "The reef knot is ideal for binding packages or bundling items when the load isn't critical. It lies flat and can be easily untied when needed.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "safety-line",
    knot: "figure-eight",
    use: "Creating a stopper knot at the end of a safety line",
    scenario: "You're setting up jacklines on deck and need to ensure the safety tethers can't pull through the attachment points.",
    why: "The figure eight creates a reliable stopper knot that won't jam or slip through hardware. It's easy to verify visually and maintains most of the rope's strength.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "quick-tie-off",
    knot: "half-hitch",
    use: "Quick and temporary tie-off",
    scenario: "You need to quickly secure a fender while approaching a dock.",
    why: "Half hitches can be tied rapidly for temporary securing. While not suitable for critical loads alone, they're perfect for quick applications when time is limited.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "basic-knot",
    knot: "overhand-knot",
    use: "Simple stopper knot or component of other knots",
    scenario: "You need to prevent the end of a newly cut line from fraying before you can properly whip it.",
    why: "The overhand knot is the simplest of all knots. While not suitable for heavy loads, it's perfect as a temporary stopper to prevent rope ends from unraveling.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  }
];
