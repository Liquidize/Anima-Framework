/*=============================================================================
 * Anima - AI Target TP
 * By Liquidize - www.mintkit.lol
 * Anima_AITargetTP.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_AITargetTP>
 * @author Liquidize
 *
 * @help
 * Use Battle AI Notetags to use TP as a stat to target against via.
 *
 * HIGHEST TP
 * LOWEST TP
 *
 * ============================================================================
 * The Anima Framework
 * ============================================================================
 * What is it? It's a series of plugins, a 'framework' if you will, developed by
 * as a part of my contribution to the RPG Maker MV community. The
 * plugin contained within this framework are plugins that are derived
 * from the plugin request forums at RPGMakerWeb. They are requests that have been
 * found interesting/unique or potentially fun to make so I went ahead and made them.
 * Anyone is free to use these in any project provided that credit is given.
 * You are free to suggest improvements, features, suggestions, or whole plugins.
 * If I like them, or its a popular request, I will add them to my list.
 *
 * Check out my website:
 * http://mintkit.lol
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.AITargetTP = Anima.AITargetTP || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_AITargetTP>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_AITargetTP parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    var aitargettAIManager_setProperTarget = AIManager.setProperTarget;
    AIManager.setProperTarget = function(group) {
        var action = this.action();
        var randomTarget = group[Math.floor(Math.random() * group.length)];
        if (group.length <= 0) return action.setTarget(randomTarget.index());
        var line = this._aiTarget.toUpperCase();
         if (line.match(/HIGHEST[ ](.*)/i)) {
            var type = String(RegExp.$1).toLowerCase();
            if (type === "tp"){
                return this.setHighestTpTarget(group);
            } else {
                aitargettAIManager_setProperTarget.call(this,group);
            }
        } else if (line.match(/LOWEST[ ](.*)/i)) {
             var type = String(RegExp.$1).toLowerCase();
            if (type === "tp") {
                return this.setLowestTpTarget(group);
            } else {
                aitargettAIManager_setProperTarget.call(this,group);
            }
        } else {
             aitargettAIManager_setProperTarget.call(this,group);
        }
    };

    AIManager.setHighestTpTarget = function(group) {
        var maintarget = group[Math.floor(Math.random() * group.length)];
        for (var i = 0; i < group.length; ++i) {
            var target = group[i];
            if (target.tp > maintarget.tp) maintarget = target;
        }
        this.action().setTarget(maintarget.index())
    };

    AIManager.setLowestTpTarget = function(group) {
        var maintarget = group[Math.floor(Math.random() * group.length)];
        for (var i = 0; i < group.length; ++i) {
            var target = group[i];
            if (target.tp < maintarget.tp) maintarget = target;
        }
        this.action().setTarget(maintarget.index())
    };

})(Anima.AITargetTP);

AITargetTP = Anima.AITargetTP;
Imported["Anima_AITargetTP"] = 1.0;