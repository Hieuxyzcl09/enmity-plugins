function r(o){window.enmity.plugins.registerPlugin(o)}

const a = {
  byProps: (...o) => window.enmity.modules.filters.byProps(...o),
  byName: (o, m) => window.enmity.modules.filters.byName(o, m),
  byTypeName: (o, m) => window.enmity.modules.filters.byTypeName(o, m),
  byDisplayName: (o, m) => window.enmity.modules.filters.byDisplayName(o, m)
};

function u(...o){return window.enmity.modules.bulk(...o)}
function y(...o){return window.enmity.modules.getByProps(...o)}

const g = window.enmity.modules.common.Messages;

function p(o){return window.enmity.patcher.create(o)}

var h = "Freemoji (edit message format)",
    f = "Send external emoji without Nitro as image links(edit by hieuxyz)",
    v = "2.0.3.1",
    S = "#f9a418",
    b = [{ name: "colin273", id: "690213339862794285" }, { name: "hieuxyz", id: "994819569795485747"];

const N = { name: h, description: f, version: v, color: S, authors: b };
const i = p("freemoji");

const [l, { getChannel: E }] = u(a.byProps("openLazy", "hideActionSheet"), a.byProps("getChannel"));
const t = y("canUseEmojisEverywhere", "canUseAnimatedEmojis", { defaultExport: !1 });

const j = {
  ...N,

  onStart() {
    let o = !0;

    i.before(l, "openLazy", (m, [, s, { pickerIntention: n }]) => {
      switch (s) {
        case "EmojiPickerActionSheet":
          if (n !== 0) break;
        case "MessageLongPressActionSheet":
          o = !1;
      }
    });

    i.after(l, "hideActionSheet", () => {
      o = !0;
    });

    t.default = { ...t.default };

    i.before(g, "sendMessage", (m, [s, n]) => {
      const w = E(s);
      n.validNonShortcutEmojis.forEach((e, c) => {
        var d;
        if (e.guildId !== w.guild_id || e.animated) {
          n.content = n.content.replace(
            `<${e.animated ? "a" : ""}:${(d = e.originalName) != null ? d : e.name}:${e.id}>`,
            `[${(d = e.originalName) != null ? d : e.name}](https://cdn.discordapp.com/emojis/${e.id}.${e.animated ? "gif" : "png"}?size=48&quality=lossless)`
          );
          delete n.validNonShortcutEmojis[c];
        }
      });
      n.validNonShortcutEmojis = n.validNonShortcutEmojis.filter(e => e);
    });

    i.instead(t.default, "canUseEmojisEverywhere", () => o);
    i.instead(t.default, "canUseAnimatedEmojis", () => o);
  },

  onStop() {
    i.unpatchAll();
  }
};

r(j);
