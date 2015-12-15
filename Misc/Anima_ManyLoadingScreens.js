/*=============================================================================
 * Anima - Open Scene Command
 * By Liquidize - www.mintkit.lol
 * Anima_ManyLoadingScreens.js
 * Version: 1.0
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_ManyLoadingScreens>
 * @author Liquidize
 *
 * @param loadingScreenCount
 * @desc How many loading screens, with a number in them do you have?
 * @default 0
 *
 * @help
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 *
 * Place Images named "LoadingX.png" in your img/system folder. Where X is,
 * replace it with a number. Going upward by 1. E.g: Loading1.png, Loading2.png,
 * Loading3.png. Make sure Loading.png also exist.
 *
 * Set the parameter 'loadingScreenCount' to the amount of images with a number
 * in them. E.G: If you have Loading1.png it would be set to 1. If you have
 * 5 loading screens (Loading1.png,Loading2.png,Loading3.png,Loading4.png,and
 * Loading5.png) set it to 5. If you DO NOT have any additional loading screens
 * leave it as 0.
 *
 * Please note this does not check to see if the loading image exist, so if it
 * doesn't nothing will be displayed.
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
Anima.ManyLoadingScreens = Anima.ManyLoadingScreens || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_ManyLoadingScreens>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_ManyLoadingScreens parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    $.Param.loadingScreenCount = Number($.Parameters.loadingScreenCount || 0);

    Graphics.startLoading = function(){
        this._loadingCount = 0;
        if ($.Param.loadingScreenCount > 0) {
            var random = Math.floor(Math.random() * ($.Param.loadingScreenCount - 0 + 1));
            if (random > 0) {
                Graphics.setLoadingImage('img/system/Loading' + random + '.png');
            } else {
                Graphics.setLoadingImage('img/system/Loading.png');
            }
        }
    };

})(Anima.ManyLoadingScreens);

ManyLoadingScreens = Anima.ManyLoadingScreens;
Imported["Anima_ManyLoadingScreens"] = 1.0;