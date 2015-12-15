/*=============================================================================
 * Anima - Custom Hit Formulas
 * By Liquidize - www.mintkit.lol
 * Anima_CustomHitFormulas.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_CustomHitFormulas>
 * @author Liquidize
 *
 * @param physicalHitFormula
 * @desc Formula used to calculate physical attacks.
 * @default
 *
 * @param magicalHitFormula
 * @desc Formula used to calculate magical attacks.
 * @default
 *
 * @help
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 *
 * If a formula is specified in the parameters, it will try to evaluate that
 * formula. If an error occurs it will return the default formulas. If no
 * formula is specified, it uses the default formulas.
 *
 * The following variables are valid to use to obtain stats,and info on things:
 *
 * VARIABLE : RETURNS
 *
 * item = this.item(), the item/skill being used.
 * actor = the person using the skill or item
 * target = the person or enemy being targeted.
 * a = same as actor
 * b = same as target
 * subject = same as actor
 * s = $gameSwitches
 * v = $gameVariables
 *
 * EXAMPLE:
 * (item.successRate * 0.01 * actor.hit)
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
Anima.CustomHitFormulas = Anima.CustomHitFormulas || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_CustomHitFormulas>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_CustomHitFormulas parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};
    $.Param.physicalHitFormula = String($.Parameters.physicalHitFormula);
    $.Param.magicalHitFormula = String($.Parameters.magicalHitFormula);

    var customHitFormulaGameAction_itemHit = Game_Action.prototype.itemHit;
    Game_Action.prototype.itemHit = function (target) {
        try {
            var item = this.item();
            var a = this.subject();
            var actor = this.subject();
            var subject = this.subject()();
            var s = $gameSwitches;
            var v = $gameVariables;
            var b = target;
            if (this.isPhysical() && $.Param.physicalHitFormula.length > 0){
                return eval($.Param.physicalHitFormula);
            } else if (this.isMagical() && $.Param.magicalHitFormula.length > 0) {
                return eval($.Param.magicalHitFormula);
            } else {
                return customHitFormulaGameAction_itemHit.call(this,target);
            }
        } catch(e){
            return customHitFormulaGameAction_itemHit.call(this,target);
        }
    };

})(Anima.CustomHitFormulas);

CustomHitFormulas = Anima.CustomHitFormulas;
Imported["Anima_CustomHitFormulas"] = 1.0;