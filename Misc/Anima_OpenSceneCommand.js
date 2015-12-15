/*=============================================================================
 * Anima - Open Scene Command
 * By Liquidize - www.mintkit.lol
 * Anima_OpenSceneCommand.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_OpenSceneCommand>
 * @author Liquidize
 * @help
 *
 * Use the following plugin commands to open their respective scenes.
 *
 * SceneSkill = Skill Scene
 * SceneItem = Item Scene
 * SceneEquip = Equipment Scene
 * SceneOptions = Options Scene
 * SceneEnd = Game End Scene
 * SceneStatus = Status Scene
 * SceneSave = Save Scene
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
Anima.OpenSceneCommand = Anima.OpenSceneCommand || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_OpenSceneCommand>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_OpenSceneCommand parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    var openSceneCommandGameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {

        if (command === "SkillScene"){
         SceneManager.push(Scene_Skill);
        } else if (command === "SceneItem") {
          SceneManager.push(Scene_Item);
        } else if (command === "SceneEquip"){
            SceneManager.push(Scene_Equip);
        } else if (command === "SceneStatus"){
            SceneManager.push(Scene_Status);
        } else if (command === "SceneOptions"){
            SceneManager.push(Scene_Options)
        } else if(command === "SceneSave"){
            SceneManager.push(Scene_Save);
        } else if (command === "SceneEnd"){
            SceneManager.push(Scene_GameEnd);
        }else
         {
            openSceneCommandGameInterpreter_pluginCommand.call(this, command, args);
        }
    };


})(Anima.OpenSceneCommand);

OpenSceneCommand = Anima.OpenSceneCommand;
Imported["Anima_OpenSceneCommand"] = 1.0;