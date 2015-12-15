/*=============================================================================
 * Anima - Open Scene Command
 * By Liquidize - www.mintkit.lol
 * Anima_SpDamageIncrease.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_SpDamageIncrease>
 * @author Liquidize
 * @help
 *
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
Anima.SpDamageIncrease = Anima.SpDamageIncrease || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_SpDamageIncrease>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_SpDamageIncrease parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    // DatabaseManager loading
    var spDamageIncrease_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!spDamageIncrease_isDatabaseLoaded.call(this)) return false;
        this.processSpDamageNotetags($dataStates);
        return true;
    };

    // Process state notetags.
    DataManager.processSpDamageNotetags = function (group) {

        var note1 = /<(?:Physical Damage Increase|physdmginc):[ ]((\+|-)?\d+)([%ï¼…])>/i;
        var note2 = /<(?:Magical Damage Increase|magidmginc):[ ]((\+|-)?\d+)([%ï¼…])>/i;
        for (var n = 1; n < group.length; n++) {

            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.physdmginc = 0.0;
            obj.magidmginc = 0.0;

            for (var i = 0; i < notedata.length; i++){
                var line = notedata[i];
                if (line.match(note1)){
                    obj.physdmginc = parseFloat(RegExp.$1 * 0.01);
                } else if (line.match(note2)){
                    obj.magidmginc = parseFloat(RegExp.$1 * 0.01);
                }
            }

        }
    };

    var spDamageIncreaseGameAction_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target,value){
        var subject = this.subject();

        // While I don't think subject is ever 'null', might as well be safe.
        if (subject === null) subject = target;

        var states = subject.states();
        var dmginc = 0.0;
        var isMagical = this.isMagical();
        var isPhysical = this.isPhysical();

        if (states.length > 0){
            for (var i = 0; i < states.length; i++){
                if (isMagical){
                    dmginc = dmginc + states[i].magidmginc;
                }else if (isPhysical){
                    dmginc = dmginc + states[i].physdmginc;
                }
            }
        }

        if (dmginc !== 0.0) {
            value = Math.round(value + (value * dmginc));
        }
        spDamageIncreaseGameAction_executeDamage.call(this,target,value);
    };


})(Anima.SpDamageIncrease);

SpDamageIncrease = Anima.SpDamageIncrease;
Imported["Anima_SpDamageIncrease"] = 1.0;