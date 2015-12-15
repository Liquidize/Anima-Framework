/*=============================================================================
 * Anima - Experience Control
 * By Liquidize - www.mintkit.lol
 * Anima_ExpControl.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_ExpControl>
 * @author Liquidize
 *
 * @param defaultExpFormula
 * @desc Default formula used to determine experience gain.
 * @default value = this.exp();
 *
 *
 * @help
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
 * Anima Experience Control
 * ============================================================================
 * Anima Experience control is a plugin that allows you to use formulas
 * to determine how much experience an enemy gives.
 * ============================================================================
 * Notetags
 * ============================================================================
 * The following are the possible notetags and their usage. Notetags are case
 * insensitive, so you can use all capitals,all lower case, or any combination.
 *
 * ============================================================================
 * Enemy Note Tags
 * ============================================================================
 * <Experience Formula> <exp>
 *
 *     WHAT IT DOES:
 *                 This notetag is given to indicate the start of the exp formula.
 *     USAGE:
 *          See the formula section for more information. This notetag
 *          while technically not optional, is however. If left out then
 *          the experience used is the one set in the exp field.
 *
 * </Experience Formula> or </exp>
 *
 *      WHAT IT DOES:
 *                  This notetag is given to a state to specify the end of a
 *                  exp formula area. Anything past this notetag
 *                  is read as something else or nothing at all.
 *      USAGE:
 *           See the exp formula section for more information. This notetag
 *           should not be used without a starting <Experience Formula> tag. However
 *           this notetag is optional if and ONLY if you are not using a <Experience Formula>
 *           tag.
 *

 * ============================================================================
 * Experience Formula Stuff
 * ============================================================================
 *
 * Experience formulas are similar to damage formulas, except a few key differences:
 *
 * The following are variables you can use in your exp formulas:
 *
 * enemy = The enemy this formula belongs to. Can be used to get stats.
 *
 * battleActors = The array of actors that were in the battle, can be used like:
 * value = battleActors[1].level * 2;
 *
 * actors = The array of actors in the game party.
 *
 * v = the games variables $gameVariables
 *
 * s = the games switches $gameSwitches
 *
 *
 * value = the value being manipulated. The exp gained is this value.
 *
 * You are able to access any stat from the enemy or from an actor in the actors
 * or battleActors array. the same as you could in damage formulas.
 *
 * The following are example formulas you can use:
 *
 * PLEASE NOTE SINCE THIS IS EVALUATED AS JAVASCRIPT A ; IS NEEDED AT THE
 * END OF EVERY LINE.
 *
 * Simple 500 exp.
 * <Experience Formula>
 *     value = 500;
 * </Experience Formula>
 *
 * An exp value that is 10 * the first member of the parties level.
 * <Experience Formula>
 *     value = 10;
 *     value = value * actors[0]._level;
 * </Experience Formula>
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
Anima.ExpControl = Anima.ExpControl || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_ExpControl>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_ExpControl parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    // validate parameters
    $.Param.defaultExpFormula = String($.Parameters.defaultExpFormula);

    //============================================================================
    // Database Manager
    //============================================================================

    // DatabaseManager loading
    var expControlDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!expControlDataManager_isDatabaseLoaded.call(this)) return false;
        this.processExperienceNotetags($dataEnemies);
        return true;
    };

    // Process state notetags to determine if an enemy has a formula, and properly
    // setup that information.
    DataManager.processExperienceNotetags = function (group) {
        for (var n = 1; n < group.length; n++) {

            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.expformula = '';

            var formula = false;
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:Experience Formula|exp)>/i)) {
                    formula = true;
                } else if (line.match(/<\/(?:Experience Formula|exp)>/i)) {
                    formula = false;
                } else if (formula) {
                    obj.expformula = obj.expformula + line + ' ';
                }
            }

        }

    };


    //============================================================================
    // Game_Enemy
    //============================================================================

    var expControlGameEnemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function() {
        var exp = expControlGameEnemy_exp.call(this);
        if (this.enemy().expformula.length > 0) {
            return this.makeExperienceFormula(exp);
        } else {
            return exp;
        }
    };

    Game_Enemy.prototype.makeExperienceFormula = function(exp){
        try {
            var enemy = this;
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var party = $gameParty;
            var battleActors = $gameParty.battleMembers();
            var actors = $gameParty.members();
            var value = 0;
            if (this.enemy().expformula) {
                eval(this.enemy().expformula);
            }
            return value;
        } catch (e) {
            return exp;
        }
    };

})(Anima.ExpControl);

ExpControl = Anima.ExpControl;
Imported["Anima_ExpControl"] = 1.0;