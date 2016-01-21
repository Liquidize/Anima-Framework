/*=============================================================================
 * Anima - Shadow Partner Rewrite
 * By Liquidize - www.mintkit.lol
 * Anima_ShadowPartnerRewrite.js
 * Version: 1.08
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_ShadowPartnerRewrite>
 * @author Liquidize
 *
 * @param defaultXOffset
 * @desc The default offset used when placing the shadows on the X axis.
 * @default 32
 *
 * @param defaultTint
 * @desc The default color used when tinting the sprites.
 * @default #000000
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
 * Anima Shadow Partner REWRITE
 * ============================================================================
 *
 * This is a complete rewrite of the plugin by the same name to bring better
 * features, better rendering, nicer code, and other things.
 *
 * Anima Shadow Partner is a plugin that enables you to create states that when
 * applied to a target grant them a "Shadow" or "Clone". This "Shadow" will take
 * a hit for them, resulting in 0 damage. However the Shadow will lose a "Life"
 * when the shadow loses all its lives, than the shadow disappears and the battler
 * with the state, loses the state. Unless the shadow is set to be persistent.
 * Shadows are also able to block only specific elements, or attack types.
 * You may not want all attacks to go to the shadow though, if its like a boss
 * attack, well no problem. You are all able to apply shadow bypasses to pretty
 * much any type of database item, be it a skill or weapon, or another state.
 *
 * Another great thing about shadows is, they are literally shadows. They will
 * follow your battlers, and do whatever they do, if they move, so does the shadow.
 * If you want a state to just give this nice shadow effect, that is okay to! You
 * can do that by applying the "Just Mimic" attribute to the shadow. Don't
 * want the shadow to mimic the original though? No problem! Just apply the
 * "Dont Mimic" attribute.
 *
 * Shadows can also be persistent, and when they're persistent you can set it
 * so that the shadows can regain one of their "lives" back at the end of
 * X amount of turns, or at the beginning of another battle.
 *
 * Shadows can also be tinted, have their opacity changed, or even "blink".
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * The following are the possible notetags and their usage. Notetags are case
 * insensitive, so you can use all capitals,all lower case, or any combination.
 *
 *
 * ============================================================================
 * State Notetags
 * ============================================================================
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Shadow Partner> and </Shadow Partner>
 *
 * WHAT THEY DO:
 *             The above note tags are what you use to define a shadow. You need
 *             to have both for a shadow to exist. The first is the opening tag,
 *             and the second is the closing tag.
 *
 * USAGE:
 *      <Shadow Partner>
 *          shadow attributes here
 *      </Shadow Partner>
 *
 * EXAMPLE:
 *        <Shadow Partner>
 *            Tint: #000000
 *            Type: all
 *            Elements: 1
 *            Hits: 3
 *        </Shadow Partner>
 *
 * EXPLANATION:
 *            The above example creates a shadow partner, that is tinted black.
 *            The shadow can also protect from all types of attacks, so long as
 *            the element of the attack is element id 1. The shadow only has
 *            3 lives.
 *
 * OPTIONAL:
 *         No, these are used to specify a state has a shadow. Therefore these
 *         are not optional if you want a state to have a shadow.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * SHADOW ATTRIBUTES
 * ============================================================================
 *
 * ----------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Shadow Tint: <x> and Tint: <x>
 *
 * WHAT THEY DO:
 *             When one of these is specified it changes the shadows tint to be
 *             the value of <x>.
 *
 * USAGE:
 *      Where <x> is place a HTML/HEX Color code.
 *
 * EXAMPLE(S):
 *        Tint: #FFFFFF
 *        Shadow Tint: #FF0000
 *
 * EXPLANATION:
 *            The above examples will designate the shadow they are given to,to
 *            be tinted white (No tint) or tinted red. Please note that only one
 *            of these tags is needed, and if more are used the one last in the
 *            list is the color used.
 *
 * OPTIONAL:
 *         Yes, if not given the value of the parameter "defaultTint" is used.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Types: <x,y,z> or Type: <x,y,z> or Shadow Type: <x,y,z> or
 *             Hit Types: <x,y,z>
 *
 * WHAT THEY DO:
 *             WHen one of these is specified it designates which type of attacks
 *             the shadow can protect from. It is formatted as comma seperated
 *             list of values hence the <x,y,z>.
 *
 * USAGE:
 *      Where <x,y,z> is replace it with a comma seperated list of any combination
 *      of the below values.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT DOES
 *             all : designates this should protect from all types.
 *             magic: designates that this should protect from magical attacks.
 *             physical: designates that this should protect from physical attacks.
 *             certain: designates that this should protect from certain hit attacks.
 *
 * EXAMPLE(S):
 *           Types: all
 *           Types: magic,physical
 *           Shadow Types: magic,all (SEE NOTE)
 *           Hit Types: certain,physical
 *
 * EXPLANATION:
 *            The first one designates that this shadow will protect from all
 *            attacks
 *            .
 *            The second one designates this only protects from magic and physical
 *            attacks.
 *
 *            The third one designates that this will actually protect against all
 *            if at any point all is specified in the list, it turns the shadow
 *            into an all type shadow.
 *
 *            The last one designates that this will only protect against certain
 *            hits and physical attacks.
 *
 * OPTIONAL:
 *         Technically yes, however note that if this is not specified then it
 *         is assumed the shadow can protect against all.
 *
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Shadow Elements: <x,y,z> or Elements: <x,y,z>
 *
 * WHAT THEY DO:
 *             WHen one of these is specified it designates which elemental types
 *             the shadow can protect from. It is formatted as comma separated
 *             list of values hence the <x,y,z>.
 *
 * USAGE:
 *      Where <x,y,z> is replace it with a list of elements this shadow can
 *      protect against, separated by a comma.
 *
 * VALID VALUES:
 *             Any list of numbers 1 through 99. Technically you can use 0,
 *             but that is the ID of the "None" or "Normal Attack" I believe.
 *             Please note that "None" does not equate to "All Element Protection"
 *
 * EXAMPLE(S):
 *           Shadow Elements: 1,2,3,4,5,6,7,8,9,10
 *           Elements: 2
 *
 * EXPLANATION:
 *            The first one designates that this shadow can protect from elements
 *            with the ID's ranging from 1 to 10.
 *
 *            The second one designates that this shadow can protect from elements
 *            with the id 2.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         can protect against all elements.
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Shadow Opacity: <x> and Opacity: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will have <x> opacity.
 *
 *   USAGE:
 *        Where <x> is replace it with a value ranging from 0 to 255.
 *
 * VALID VALUES:
 *             Any number 0 through 255.
 *
 * EXAMPLE(S):
 *           Shadow Opacity: 0
 *           Opacity: 157
 *
 * EXPLANATION:
 *            The first one designates that this shadow has 0 opacity, or invisible.
 *
 *            The second one designates that this shadow has 157 opacity, or roughly
 *            half see through.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         is fully visible (255).
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Persist: <x> or Persistent: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will be persistent,
 *              and if its lives reach 0 will not be removed. This can be used
 *              to make shadows seem like passive states.
 *
 *   USAGE:
 *        Where <x> is replace it with a value of true, or false.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT DOES
 *             true : makes this shadow persistenet
 *             false: the shadow is not persistent
 *
 * EXAMPLE(S):
 *           Persistent: true
 *           Persist: false
 *
 * EXPLANATION:
 *            The first one designates that this shadow is persistent.
 *
 *            The second one designates that this shadow is not persistent.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         is NOT persistent.
 *
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Restore Turns: <x> or turns for restore: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will regain a shadow life
 *              after <x> amount of turns (at the end of the <x>'th turn). This requires
 *              that the shadow be persistent.
 *
 *   USAGE:
 *        Where <x> is replace it with any number, from 0 to infinity.
 *
 * VALID VALUES:
 *             Any number 0 through infinity.
 *
 * EXAMPLE(S):
 *           Restore Turns: 0
 *           Turns For Restore: 99
 *
 * EXPLANATION:
 *            The first one designates that this shadow if persistent, will NOT get
 *            any shadows back, at all after any number of turns.
 *
 *            The second one designates that this shadow will regain a shadow at the
 *            end of their 99th turn, and then reset to wait another 99 turns. Repeating
 *            till the end of the battle (So every 99th turn).
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         WILL NOT GET ANY LIVES BACK AT THE END OF ANY TURN (A VALUE OF 0).
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Restore On Start: <x> or On Start Restore: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will regain <x> lives
 *              when any battle starts. IF the shadow is persistent, and if the
 *              shadow doesn't already have its maximum amount of lives already.
 *
 *   USAGE:
 *        Where <x> is replace it with any number, from 0 to infinity.
 *
 * VALID VALUES:
 *             Any number 0 through infinity.
 *
 * EXAMPLE(S):
 *           Restore On Start: 0
 *           On Start Restore: 5
 *
 * EXPLANATION:
 *            The first one designates that this shadow if persistent, will NOT get
 *            any shadows back, at the start of any battle EVER.
 *
 *            The second one designates that this shadow will regain 5 shadows, if
 *            possible at the beginning of every battle.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         WILL NOT GET ANY LIVES BACK AT THE START OF A BATTLE (A VALUE OF 0).
 *
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Blink: <x> or Shadow Blink: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will either "Blink"
 *              (Flash in and out), or not.
 *
 *   USAGE:
 *        Where <x> is replace it with true or false.
 *
 * VALID VALUES:
 *             True or false.
 *
 * EXAMPLE(S):
 *           Blink: false
 *           Shadow Blink: true
 *
 * EXPLANATION:
 *            The first one designates that this shadow will not blink.
 *
 *            The second one designates that this shadow will blink.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         WILL NOT BLINK.
 *
 * SPECIAL NOTES:
 *              CURRENTLY THIS IS ONLY SUPPORTED BY ENEMY SHADOWS. However
 *              adding this attribute, and then giving the shadow to an actor
 *              will not cause harm.
 *
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Just Mimic: <x> or Only Mimic: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates that the shadow will either only mimic the
 *              original, and not act as a life saver/shield or do both.
 *
 *   USAGE:
 *        Where <x> is replace it true, or false.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT MEANS
 *             true : The shadow will only follow the target and not act as a shield.
 *             false; The shadow will follow the target AND act as a shield.
 *
 * EXAMPLE(S):
 *           Just Mimic: true
 *           Only Mimic: false
 *
 * EXPLANATION:
 *            The first one designates that this shadow will only follow the original,
 *            for the clone effect and not save them from damage.
 *
 *            The second one designates that this shadow will both follow the original and
 *            save them from damage if possible.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         WILL DO BOTH FOLLOW AND ACT AS A SHIELD (VALUE OF FALSE)
 *
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Dont Mimic: <x> or No Mimic: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates whether or not the shadow will mimic,
 *              or not.
 *
 *   USAGE:
 *        Where <x> is replace it with true or false.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT MEANS
 *             true : The shadow will stand still, and not follow.
 *             false: The shadow will follow.
 *
 * EXAMPLE(S):
 *           Dont Mimic: true
 *           No Mimic: false
 *
 * EXPLANATION:
 *            The first one designates that this shadow will just stand still.
 *
 *            The second one designates that this shadow will follow the battler
 *            when they do actions.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         WILL FOLLOW THE BATTLER (A VALUE OF FALSE).
 *
 * ------------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------------
 * ATTRIBUTE(S):
 *             Shadow Count: <x>
 *
 * WHAT THEY DO:
 *              When specified it designates whether or not the state will use
 *              the amount of lives left to display the amount of shadow sprites.
 *
 *   USAGE:
 *        Where <x> is replace it with true or false.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT MEANS
 *             true : The amount of lives left is displayed as individual shadows
 *             false: The standard/normal method for displaying shadows.
 *
 * EXAMPLE(S):
 *           Shadow Count: true
 *           Shadow Count: false
 *
 * EXPLANATION:
 *            The first one designates that this shadow state will use the amount
 *            of lives left, to display the amount of shadows.
 *
 *            The second one designates that this shadow state will act as a normal
 *            shadow state.
 *
 * OPTIONAL:
 *         Technically yes, however if not specified than it is assumed the shadow
 *         state WILL DISPLAY AS NORMAL (A VALUE OF FALSE).
 *
 * NOTES:
 *      I don't particularly like this method, its why i rewrote this to begin with.
 *      However many of you do, so I am still supporting it, and will continue to develop
 *      with it, be advised though that it may be buggy.
 *
 * ------------------------------------------------------------------------------
 *
 * ============================================================================
 * FULL SHADOW STATE EXAMPLES
 * ============================================================================
 *
 * ----------------------------------------------------------------------------
 * EXAMPLE:
 *
 * <Shadow Partner>
 *     Tint: #FF0000
 *     Hits: 5
 *     Dont Mimic: true
 *     Opacity: 157
 * </Shadow Partner>
 *
 * EXPLANATION:
 *            The above example will create a state that when applied to a target
 *            will grant them a shadow partner affect with a shadow tint of "red",
 *            and 5 lives. This shadow will also not follow the target, and has
 *            an opacity of 157. The shadow will be able to protect against all
 *            types of attacks, and all elements.
 * ------------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * EXAMPLE:
 *
 * <Shadow Partner>
 *     Hits: 1
 *     Opacity: 50
 *     Types: magic
 *     Elements: 5
 * </Shadow Partner>
 *
 * EXPLANATION:
 *            The above example will create a state that when applied to a target
 *            will grant them a shadow partner affect with the default tint and
 *            and 1 life. The shadow will have an opacity of 50, and only be able to
 *            protect against attacks from the element with ID 5, and only magical attacks.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Actor,Enemy,Class,Item,Skill,Weapon,Armor,State Notetags
 * ============================================================================
 *
 * The follow are notetags that can be used on any actor,enemy,skill,item,class,
 * weapon,armor, or state. These are used to create things that can bypass
 * shadow partners.
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <ShadowBypass: x> or <Shadow Bypass Type: x>
 *
 * WHAT THEY DO:
 *             The above note tags are what you use to define a shadow bypass. You need
 *             depending on the value of 'x' depends on whether or not this bypass,
 *             can bypass a particular shadow. If element type/bypass willing.
 *
 * USAGE:
 *      Where x is, specify a list of strings, that determine which type of shadows
 *      this can bypass.
 *
 * VALID VALUES:
 *             VALUE : WHAT IT DOES
 *             all : can by pass all shadow attack types
 *             magic : can bypass magic shadows.
 *             physical : can bypass physical hit shadows.
 *             certain : can bypass cetain hit shadows.
 * EXAMPLE(S):
 *           <Shadow Bypass Type: all>
 *           <Shadow Bypass Type: magic,physical>
 *
 * EXPLANATION:
 *            THe first one will specify that if a battler has this bypass in
 *            any way possible (be it skill usage,item usage, state, armor,etc)
 *            than they can bypass all types of shadows, if the bypass element
 *            is also valid.
 *
 *            The second one designates that this bypass will only bypass physical
 *            and magic shadow.
 *
 * OPTIONAL:
 *         No, these are used to specify a bypass, if something doesn't have this
 *         then three is no bypass.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Shadow Bypass Elements: x,y,z> or <ShadowBypassElements: x,y,z>
 *
 * WHAT THEY DO:
 *             The above note tags are what you use to define what elements a shadow bypass
 *             can bypass.
 *
 * USAGE:
 *      Where 'x,y,z' is specify a list of numbers that will be used to determine
 *      if this bypass can bypass a shadow (after checking if the type is a match) based
 *      off its element.
 *
 * VALID VALUES:
 *             Any number 1 through 99. Technically 0 is also possible, but
 *             similar to the Shadow Element type, its for either "None" or
 *             "Normal Attack" element. A special number 100 can be used to
 *             say this element bypass can bypass ALL elements.
 * EXAMPLE(S):
 *           <Shadow Bypass Elements: 1,2,3,4,5>
 *           <Shadow Bypass Elements: 1,2,3,4,5,100>
 *           <ShadowBypassElements: 100>
 *           <ShadowBypassElements: 10>
 *
 * EXPLANATION:
 *            THe first one will specify that if a battler has this bypass in
 *            any way possible (be it skill usage,item usage, state, armor,etc)
 *            than they can bypass elemental shadows with an element 1 through 5.
 *
 *            The second one designates that this bypass will bypass ALL ELEMENTS,
 *            due to that fact that 100 is included.
 *
 *            The third one designates that this elemental bypass will bypass all elements.
 *
 *            The fourth one is used to determine that this elemental bypass will
 *            bypass only the 10th element.
 *
 * OPTIONAL:
 *         No, these are used to specify a bypass, if something doesn't have this
 *         then three is no bypass. Use a value of 100 to make this easy if you
 *         don't care about elemental bypassing.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * BETA NOTICE
 * ============================================================================
 *
 * For the time being I am saying that this is a beta plugin. There are still
 * some missing features, as well as some issues. I am unsure of the stability of
 * this plugin, however it seems to work just fine for me. If you notice any bugs
 * please do let me know. The quality of code in this plugin isn't top notch, as
 * this is rather complex and I'm still new to Javascript. However, over time it
 * will definitely improve.
 *
 * KNOWN MISSING FEATURES:
 * - Actor Shadow Blinking
 * - Using a sprites width to determine where to place it
 * - Some parameters
 *
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.08:
 *			   - Fixed a bug where when not in battle, sprite animations attempt to occurr.
 *
 * Version 1.07:
 *             - Fixed an issue where the shadow would render off screen.
 *
 * Version 1.06:
 *             - Fixed an issue where if a battler died, the shadow would remain.
 *             - Fixed an issue where opacity wasn't being properly updated.
 *
 * Version 1.05:
 *             - Rewrote Sprite Handling
 *             - Fixed an issue with shadows causing 'waits' to be ignored.
 *
 * Version 1.04:
 *             - Initial Public release
 *
 * Version 1.03:
 *            - Fixed a regular expression (Hits)
 *            - Added Subject/Target Attack Element Support.
 *
 * Version 1.01 - 1.02:
 *                    Fixed some things I hope.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.ShadowPartner = Anima.ShadowPartner || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_ShadowPartnerRewrite>');
    });

    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_ShadowPartnerRewrite parameters.");
    }

    $.Parameters = parameters[0].parameters;
    $.Param = {};
    $.Param.defaultXOffset = Number($.Parameters.defaultXOffset || 32);
    $.Param.defaultTint = String($.Parameters.defaultTint);
    // validate parameters

    //============================================================================
    // Database Manager
    //============================================================================

    // DatabaseManager loading
    var shadowPartnerDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!shadowPartnerDataManager_isDatabaseLoaded.call(this)) return false;
        this.processShadowNotetags($dataStates);
        this.processShadowBypassNotetags($dataStates);
        this.processShadowBypassNotetags($dataActors);
        this.processShadowBypassNotetags($dataEnemies);
        this.processShadowBypassNotetags($dataClasses);
        this.processShadowBypassNotetags($dataSkills);
        this.processShadowBypassNotetags($dataItems);
        this.processShadowBypassNotetags($dataWeapons);
        this.processShadowBypassNotetags($dataArmors);


        return true;
    };

    // Process state notetags.
    DataManager.processShadowNotetags = function (group) {
        var note1 = /(?:Shadow Tint|Tint):[ ](#[0-9a-fA-F]+)/i;
        var note2 = /(?:Types|Type|Shadow Type|Hit Types):[ ](((certain|all|physical|magic)+,?)+)/i;
        var note3 = /(?:Shadow Elements|elements):[ ](([0-9]+,?)+)/i;
        var note4 = /(?:Shadow Hit Times|hit times|hits):[ ](\d+)/i;
        var note5 = /(?:Shadow Opacity|opacity):[ ](\d+)/i;
        var note6 = /(?:Restore Turns|turns for restore):[ ](\d+)/i;
        var note7 = /(?:Restore On Start|on start restore):[ ](\d+)/i;
        var note8 = /(?:Persistent|persist):[ ](true|false)/i;
        var note9 = /(?:Shadow Blink|blink):[ ](true|false)/i;
        var note10 = /(?:Just Mimic|Only Mimic):[ ](true|false)/i;
        var note11 = /(?:Dont Mimic|No Mimic):[ ](true|false)/i;
        var note12 = /(?:Shadow Foreach Hit|Hit Count Shadows|Shadow Count):[ ](true|false)/i;
        for (var n = 1; n < group.length; n++) {

            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.shadow = {};
            obj.shadow.hasshadow = false;
            obj.shadow.hittimes = 3;
            obj.shadow.hitelements = [];
            obj.shadow.hittypes = [];
            obj.shadow.tint = $.Param.defaultTint.replace('#','0x');
            obj.shadow.opacity = 255;
            obj.shadow.blink = false;
            obj.shadow.justmimic = false;
            obj.shadow.mimic = true;
            obj.shadow.reapplyonrenew = false;
            obj.shadow.shadowperhit = false;
            obj.shadow.ispersist = false;
            obj.shadow.persist = {};
            obj.shadow.persist.restoreturns = 0;
            obj.shadow.persist.onstart = 0;

            var info = false;
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:Shadow Partner|ashadow)>/i)) {
                    obj.shadow.hasshadow = true;
                    info = true;
                } else if (line.match(/<\/(?:Shadow Partner|ashadow)>/i)) {
                    info = false;
                }
                if (info) {
                    if (line.match(note1)) {
                        var tint = RegExp.$1.replace('#', '0x');
                        obj.shadow.tint = tint;
                    } else if (line.match(note2)) {
                        var types = RegExp.$1.split(',');
                        types.forEach(function(type){
                           switch (type.toLowerCase()){
                               case "all":
                                   obj.shadow.hittypes.push(0);
                                   break;
                               case "physical":
                                   obj.shadow.hittypes.push(2);
                                   break;
                               case "certain":
                                   obj.shadow.hittypes.push(1);
                                   break;
                               case "magic":
                                   obj.shadow.hittypes.push(3);
                                   break;
                           }
                        });
                    } else if (line.match(note3)) {
                        var elements = RegExp.$1.split(',');
                        for (var j = 0; j < elements.length; j++) {
                            obj.shadow.hitelements[obj.shadow.hitelements.length] = Number(elements[j]);
                        }
                    } else if (line.match(note4)) {
                        obj.shadow.hittimes = Number(RegExp.$1);
                    } else if (line.match(note5)) {
                        obj.shadow.opacity = Number(RegExp.$1);
                    } else if (line.match(note6)) {
                        obj.shadow.persist.restoreturns = Number(RegExp.$1);
                        obj.shadow.ispersist = true;
                    } else if (line.match(note7)) {
                        obj.shadow.persist.onstart = Number(RegExp.$1);
                        obj.shadow.ispersist = true;
                    } else if (line.match(note8)) {
                        obj.shadow.ispersist = eval(RegExp.$1);
                    } else if (line.match(note9)) {
                        obj.shadow.blink = eval(RegExp.$1);
                    } else if (line.match(note10)) {
                        obj.shadow.justmimic = eval(RegExp.$1);
                    } else if (line.match(note11)){
                        obj.shadow.mimic = !eval(RegExp.$1);
                    } else if (line.match(note12)) {
                        obj.shadow.shadowperhit = eval(RegExp.$1);
                    }
                }
            }

        }

    };

    DataManager.processShadowBypassNotetags = function (group) {
        var note1 = /<(?:Shadow Bypass Type|shadowbypass):[ ](((certain|all|physical|magic)+,?)+)>/i;
        var note2 = /<(?:Shadow Bypass Elements|shadowbypasselements):[ ](([0-9]+,?)+)>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.shadowbypass = {};
            obj.shadowbypass.hittypes = [];
            obj.shadowbypass.hitelements = [];

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var types = RegExp.$1.split(',');
                    for (var i = 0; i < types.length; i++) {
                        var type = types[i].toLowerCase();
                        if (type === "all") obj.shadowbypass.hittypes[obj.shadowbypass.hittypes.length] = 0;
                        if (type === "certain") obj.shadowbypass.hittypes[obj.shadowbypass.hittypes.length] = 1;
                        if (type === "physical")obj.shadowbypass.hittypes[obj.shadowbypass.hittypes.length] = 2;
                        if (type === "magic") obj.shadowbypass.hittypes[obj.shadowbypass.hittypes.length] = 3;
                    }
                } else if (line.match(note2)) {
                    var elements = RegExp.$1.split(',');
                    for (var i = 0; i < elements.length; i++) {
                        obj.shadowbypass.hitelements[obj.shadowbypass.hitelements.length] = (Number(elements[i]));
                    }
                }
            }

        }
    };


    //============================================================================
    // Game_Battler
    //============================================================================

    var shadowPartnerGameBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        shadowPartnerGameBattler_initMembers.call(this);
        this.shadowPartners = [];
    };

    Game_Battler.prototype.removeShadowForState = function (stateId) {
        for (var i = 0; i < this.shadowPartners.length; i++) {
            var shadow = this.shadowPartners[i];
            if (shadow.stateId === stateId) {
                for (var j = 0; j < this.battler().shadowPartnerSprites.length; j++) {
                    if (this.battler().shadowPartnerSprites[j].stateId === shadow.stateId) {
                        BattleManager._spriteset._battleField.removeChild(this.battler().shadowPartnerSprites[j]);
                        this.battler().shadowPartnerSprites.splice(j, 1);
                    }
                }
                this.shadowPartners.splice(i, 1);

                var teamOffset = 1;
                if (this.isEnemy()) teamOffset = -1;
                for (var x = 0; x < this.battler().shadowPartnerSprites.length; x++) {
                    this.battler().shadowPartnerSprites[x].setHome(this.battler()._homeX + (this.shadowPartners.length * $.Param.defaultXOffset) * teamOffset, this.battler()._homeY);
                }

            }
        }
    };

    var shadowPartnerGameBattler_clearStates = Game_Battler.prototype.clearStates;
    Game_Battler.prototype.clearStates = function() {
        if (this.shadowPartners && this.shadowPartners.length > 0) {
            for (var i = 0; i < this.shadowPartners.length; i++) {
                var shadow = this.shadowPartners[i];
                if ($gameParty.inBattle()) {
                    for (var j = 0; j < this.battler().shadowPartnerSprites.length; j++) {
                        if (this.battler().shadowPartnerSprites[j].stateId === shadow.stateId) {
                            BattleManager._spriteset._battleField.removeChild(this.battler().shadowPartnerSprites[j]);
                            this.battler().shadowPartnerSprites.splice(j, 1);
                        }
                    }
                    var teamOffset = 1;
                    if (this.isEnemy()) teamOffset = -1;
                    for (var x = 0; x < this.battler().shadowPartnerSprites.length; x++) {
                        this.battler().shadowPartnerSprites[x].setHome(this.battler()._homeX + (this.shadowPartners.length * $.Param.defaultXOffset) * teamOffset, this.battler()._homeY);
                    }
                }
            }
            this.shadowPartners = [];
        }

        shadowPartnerGameBattler_clearStates.call(this);
    };

    Game_Battler.prototype.getShadowForState = function (stateId) {
        for (var i = 0; i < this.shadowPartners.length; i++) {
            if (this.shadowPartners[i].stateId === stateId) {
                return this.shadowPartners[i];
            }
        }

        return null;
    };

    Game_Battler.prototype.hasShadowForState = function (stateId) {
        if (this.shadowPartners.length === 0) return false;
        for (var i = 0; i < this.shadowPartners.length; i++) {
            if (this.shadowPartners[i].stateId === stateId) return true;
        }
        return false;
    };

    var shadowPartnerGameBattler_forceMotion = Game_Battler.prototype.forceMotion;
    Game_Battler.prototype.forceMotion = function (motionType) {
        shadowPartnerGameBattler_forceMotion.call(this, motionType);
		if (!$gameParty.inBattle()) return;
        if (!this.battler().shadowPartnerSprites.length > 0) return;
        if (!this.spriteCanMove()) return;
        if (!$gameSystem.isSideView()) return;
        this.battler().shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.forceMotion(motionType);
            }
        });
    };

    var shadowPartnerGameBattler_spriteFloat = Game_Battler.prototype.spriteFloat;
    Game_Battler.prototype.spriteFloat = function (floatHeight, floatDuration) {
        shadowPartnerGameBattler_spriteFloat.call(this, floatHeight, floatDuration);
        if (!this.battler().shadowPartnerSprites.length > 0) return;
        if (!this.spriteCanMove()) return;
        if (!$gameSystem.isSideView()) return;
        this.battler().shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.setupFloat(floatHeight, floatDuration);
            }
        });
    };

    var shadowPartnerGameBattler_spriteJump = Game_Battler.prototype.spriteJump;
    Game_Battler.prototype.spriteJump = function (jumpHeight, jumpDuration) {
        shadowPartnerGameBattler_spriteJump.call(this, jumpHeight, jumpDuration);
        if (!this.battler().shadowPartnerSprites.length > 0) return;
        if (!this.spriteCanMove()) return;
        if (!$gameSystem.isSideView()) return;
        this.battler().shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.setupJump(jumpHeight, jumpDuration);
            }
        });
    };

    var shadowPartnerGameBattler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function (stateId) {
        if (this.isStateAffected(stateId)) {
            if (this.hasShadowForState(stateId)) {
                this.removeShadowForState(stateId);
            }

            shadowPartnerGameBattler_removeState.call(this, stateId);
        }
    };

    var shadowPartnerGameBattler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function () {
        shadowPartnerGameBattler_onTurnEnd.call(this);
        if (this.shadowPartners.length > 0) {
            for (var i = 0; i < this.shadowPartners.length; i++) {
                var state = $dataStates[this.shadowPartners[i].stateId];
                if (state.shadow.ispersist && state.shadow.persist.restoreturns > 0) {
                    if ((this.shadowPartners[i].lastrestoreon + 1) >= state.shadow.persist.restoreturns) {
                        var shadowsAdded = 1 + this.shadowPartners[i].hitsleft;
                        if (shadowsAdded > this.shadowPartners[i].maxhits) {
                            shadowsAdded = this.shadowPartners[i].maxhits - this.shadowPartners[i].hitsleft;
                            this.shadowPartners[i].hitsleft = this.shadowPartners[i].maxhits;
                        } else {
                            this.shadowPartners[i].hitsleft = shadowsAdded;
                        }
                        this.shadowPartners[i].lastrestoreon = 0;

                        if ($gameParty.inBattle()){
                            if (state.shadow.shadowperhit){
                                for (var j = 0; j < shadowsAdded; j++){
                                    this.addShadowSprite(state);
                                }
                                var teamOffset = 1;
                                var initXOffset = $.Param.defaultXOffset;
                                if (this.isEnemy()) teamOffset = -1;
                                for (var x = 0; x < this.battler().shadowPartnerSprites.length; x++) {
                                    this.battler().shadowPartnerSprites[x].setHome(this.battler()._homeX + (initXOffset * teamOffset), this.battler()._homeY);
                                    initXOffset += initXOffset;
                                }
                            } else {
                                var battler = this.battler();
                                for (var s = 0; s < battler.shadowPartnerSprites.length; s++){
                                    if (battler.shadowPartnerSprites[s].stateId === state.id){
                                        battler.shadowPartnerSprites[s].show();
                                    }
                                }
                            }
                        }

                    }
                    this.shadowPartners[i].lastrestoreon = this.shadowPartners[i].lastrestoreon + 1;
                }
            }
        }
    };

    var shadowPartnerGameBattler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function () {
        shadowPartnerGameBattler_onBattleStart.call(this);
        if (this.shadowPartners.length > 0) {
            for (var i = 0; i < this.shadowPartners.length; i++){
                var shadow = this.shadowPartners[i];
                var state = $dataStates[shadow.stateId];
                if (state) {
                    // Give starting shadows.
                    if (state.shadow.persist.onstart > 0) {
                        var shadowsAdded = state.shadow.persist.onstart + shadow.hitsleft;
                        if (shadowsAdded > shadow.maxhits) {
                            shadow.hitsLeft = shadow.maxhits;
                        } else {
                            shadow.hitsleft = shadowsAdded;
                        }
                    }
                    if (state.shadow.shadowperhit){
                        for (var x = 0; x < shadow.hitsLeft; x++){
                            this.addShadowSprite(state);
                        }
                    } else {
                        this.addShadowSprite(state);
                    }
                }
            }
        }
    };

    Game_Battler.prototype.getShadowBypasses = function () {
        var bypasses = [];

        if (this.isActor()) {
            var actor = this.actor();
            if (actor.shadowbypass.hittypes.length > 0) {
                bypasses.push(this.shadowbypass);
            }
        } else {
            var enemy = this.enemy();
            if (enemy.shadowbypass.hittypes.length > 0) {
                bypasses.push(this.shadowbypass);
            }
        }

        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.shadowbypass.hittypes.length > 0) bypasses.push(state.shadowbypass);
        }

        return bypasses;
    };

    Game_Battler.prototype.addShadowSprite = function(state,shadow){
        var battlerSprite = this.battler();
        var shadowSprite = null;
        if (this.isActor()) {
            shadowSprite = new Sprite_ActorShadow(this);
        } else {
            shadowSprite = new Sprite_EnemyShadow(this);
        }
        shadowSprite.stateId = state.id;
        shadowSprite.setBattler(this);
        battlerSprite.shadowPartnerSprites.push(shadowSprite);
        if (this.isActor()) {
           shadowSprite.setHome(battlerSprite._homeX + (battlerSprite.shadowPartnerSprites.length * $.Param.defaultXOffset), battlerSprite._homeY);
          } else {
            shadowSprite.setHome(battlerSprite._homeX - (battlerSprite.shadowPartnerSprites.length * $.Param.defaultXOffset), battlerSprite._homeY);

        }
        shadowSprite.setTint(state.shadow.tint);
        shadowSprite.setOpacity(state.shadow.opacity);
        shadowSprite.setMimic(state.shadow.mimic);
        shadowSprite._shadowCountSprite.setup(this,state.id);
        if (state.shadow.shadowperhit){
            shadowSprite._shadowCountSprite.hide();
        }
        BattleManager._spriteset._battleField.addChild(shadowSprite);
    };

    var shadowPartnerGameBattler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function (stateId) {
        var state = $dataStates[stateId];

        if (state && state.shadow && state.shadow.hasshadow) {
            if (this.hasShadowForState(stateId)) {
                if (state.shadow.reapplyonrenew) {
                    var shadow = this.getShadowForState(stateId);
                    shadow.hitsleft = shadow.maxhits;
                }
            } else {
                var shadowPartner = {};
                shadowPartner.hitsleft = state.shadow.hittimes;
                shadowPartner.maxhits = shadowPartner.hitsleft;
                shadowPartner.stateId = stateId;
                shadowPartner.lastrestoreon = 0;
                this.shadowPartners.push(shadowPartner);
                if ($gameParty.inBattle()) {
                    if (state.shadow.shadowperhit){
                        for (var i = 0; i < shadowPartner.maxhits; i++){
                            this.addShadowSprite(state,shadowPartner);
                        }
                    } else{
                        this.addShadowSprite(state,shadowPartner);
                    }
                }
            }
        }
        shadowPartnerGameBattler_addState.call(this, stateId);
    };

    var shadowPartnerGameActor_getShadowBypasses = Game_Actor.prototype.getShadowBypasses;
    Game_Actor.prototype.getShadowBypasses = function () {
        var bypasses = shadowPartnerGameActor_getShadowBypasses.call(this);

        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var equip = equips[i];
            if (equip !== null) {
                if (equip.shadowbypass.hittypes.length > 0) {
                    bypasses.push(equip.shadowbypass);
                }
            }
        }

        return bypasses;
    };


    //============================================================================
    // Game_Action
    //============================================================================

    var shadowPartnerGameAction_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function (target, value) {
        if (value > 0) {
            if (target.shadowPartners.length > 0) {
                for (var i = 0; i < target.shadowPartners.length; i++) {
                    var shadow = target.shadowPartners[i];
                    var state = $dataStates[shadow.stateId];
                    if (!state.shadow.justmimic && shadow.hitsleft > 0) {
                        if (this.canShadowTakeHit(state)) {
                            if (!this.canBypassShadow(state)) {
                                shadow.hitsleft = shadow.hitsleft - 1;
                                value = 0;

                                var battler = target.battler();
                                if ($gameParty.inBattle()){
                                    if (state.shadow.shadowperhit) {
                                    for (var s = 0; s < battler.shadowPartnerSprites.length; s++) {
                                        if (battler.shadowPartnerSprites[s].stateId === shadow.stateId && !battler.shadowPartnerSprites[s]._hiding) {

                                            battler.shadowPartnerSprites[s].hide();
                                            battler.shadowPartnerSprites.splice(s, 1);
                                            var teamOffset = 1;
                                            var initXOffset = $.Param.defaultXOffset;
                                            if (target.isEnemy()) teamOffset = -1;
                                            for (var x = 0; x < target.battler().shadowPartnerSprites.length; x++) {
                                                target.battler().shadowPartnerSprites[x].setHome(target.battler()._homeX + (initXOffset * teamOffset), target.battler()._homeY);
                                                initXOffset += initXOffset;
                                            }
                                            break;
                                        }
                                    }
                                    }
                                }


                                if (shadow.hitsleft <= 0 && !state.shadow.ispersist) {
                                    target.removeState(shadow.stateId);
                                }

                                if ($gameParty.inBattle()) {
                                    if (shadow.hitsleft <= 0 && state.shadow.ispersist && !state.shadow.shadowper) {

                                        for (var s = 0; s < battler.shadowPartnerSprites.length; s++) {
                                            if (battler.shadowPartnerSprites[s].stateId === shadow.stateId){
                                                battler.shadowPartnerSprites[s].hide();
                                            }
                                        }
                                            }
                                }
                                // don't need to hit anymore shadows!
                                break;
                            }
                        }
                    }
                }
            }
        }
        shadowPartnerGameAction_executeDamage.call(this, target, value);
    };

    Game_Action.prototype.canBypassShadow = function (state) {
        var shadow = state.shadow;
        var hittype = this.getShadowHitType();
        var bypasses = this.subject().getShadowBypasses();

        if (this.item().shadowbypass.hittypes.length > 0) bypasses.push(this.item().shadowbypass);

        for (var i = 0; i < bypasses.length; i++) {
            var bypass = bypasses[i];
            for (var j = 0; j < shadow.hittypes.length; j++) {
                if (bypass.hittypes.indexOf(shadow.hittypes[j]) > -1) {
                    if (bypass.hitelements.indexOf(100) > -1) return true;
                    for (var e = 0; e < shadow.hitelements.length; e++) {
                        if (bypass.hitelements.indexOf(shadow.hitelements[e]) > -1) {
                            return true;
                        }
                    }
                }

            }
        }
        return false;
    };

    Game_Action.prototype.canShadowHitSubjectAttackElement = function(shadow){
        for (var i = 0; i < this.subject().attackElements().length; i++){
            if (shadow.hitelements.indexOf(this.subject().attackElements()[i]) > -1) return true;
        }
        return false;
    };

    Game_Action.prototype.canShadowTakeHit = function (state) {
        var shadow = state.shadow;
        var hittype = this.getShadowHitType();

        // Can this shadow take all hits?
        if (shadow.hittypes.indexOf(0) > -1 || shadow.hittypes.length === 0) {
            // Assume all elements, so we can hit it.
            if (shadow.hitelements.length === 0) {
                return true;
            } else {
                if (shadow.hitelements.indexOf(this.item().damage.elementId) > -1 || this.canShadowHitSubjectAttackElement(shadow)) {
                    return true;
                }
            }
        } else if (shadow.hittypes.indexOf(hittype) > -1) {
            if (shadow.hitelements.length === 0) {
                return true;
            } else {
                if (shadow.hitelements.indexOf(this.item().damage.elementId) > -1 || this.canShadowHitSubjectAttackElement(shadow)) {
                    return true;
                }
            }
        }
        return false;
    };

    Game_Action.prototype.getShadowHitType = function () {
        if (this.isCertainHit()) {
            return 1;
        } else if (this.isPhysical()) {
            return 2;
        } else if (this.isMagical()) {
            return 3;
        }
        return 0;
    };

    //============================================================================
    // Sprite_Battler
    //============================================================================

    var shadowPartnerSpriteBattler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        shadowPartnerSpriteBattler_initMembers.call(this);
        this.shadowPartnerSprites = [];

    };

    var shadowPartnerSpriteBattler_startMove = Sprite_Battler.prototype.startMove;
    Sprite_Battler.prototype.startMove = function (x, y, duration) {
        if (this._battler && !this._battler.spriteCanMove()) return;
        shadowPartnerSpriteBattler_startMove.call(this, x, y, duration);
        if (!this.shadowPartnerSprites.length > 0) return;
        if (!$gameSystem.isSideView()) return;
        this.shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.startMove(x, y, duration);
            }
        });

    };

    var shadowPartnerSpriteBattler_setMirror = Sprite_Battler.prototype.setMirror;
    Sprite_Battler.prototype.setMirror = function(value) {
        shadowPartnerSpriteBattler_setMirror.call(this,value);
        if (this.shadowPartnerSprites.length !== 0) {
            for (var i = 0; i < this.shadowPartnerSprites.length; i++){
                this.shadowPartnerSprites[i].setMirror(value);
            }
        }
    };

    //============================================================================
    // Sprite_Actor
    //============================================================================


    var shadowPartnerSpriteActor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function () {
        shadowPartnerSpriteActor_setupWeaponAnimation.call(this);
        if (!this.shadowPartnerSprites.length > 0) return;
        if (!$gameSystem.isSideView()) return;
        this.shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.setupWeaponAnimation();
            }
        });

    };

    var shadowPartnerSpriteActorStartMotion = Sprite_Actor.prototype.startMotion;
    Sprite_Actor.prototype.startMotion = function (motionType) {
        shadowPartnerSpriteActorStartMotion.call(this, motionType);
        if (!this.shadowPartnerSprites.length > 0) return;
        if (!$gameSystem.isSideView()) return;
        this.shadowPartnerSprites.forEach(function (shadowPartner) {
            if (shadowPartner.mimic) {
                shadowPartner.startMotion(motionType);
            }
        });
    };


    //=============================================================================
    // Compatibility patch with YEP_BattleEngineCore
    // Checks to make sure the sprite we are requesting to be registered is not
    // an instance of Sprite_ActorShadow or Sprite_EnemyShadow first.
    //=============================================================================

    if (Imported.YEP_BattleEngineCore) {
        BattleManager.registerSprite = function (battler, sprite) {
            if (!this._registeredSprites) this._registeredSprites = {};
            if (battler.isActor()) var id = 100000 + battler.actorId();
            if (battler.isEnemy()) var id = 200000 + battler.index();
            if (Sprite_ActorShadow.prototype.isPrototypeOf(sprite)) return;
            if (Sprite_EnemyShadow.prototype.isPrototypeOf(sprite)) return;
            this._registeredSprites[id] = sprite;
        };

    }


    //============================================================================
    // Sprite_ShadowCount, to display shadow count
    //============================================================================


    function Sprite_ShadowCount() {
        this.initialize.apply(this, arguments);
    }



    Sprite_ShadowCount.prototype = Object.create(Sprite_Base.prototype);
    Sprite_ShadowCount.prototype.constructor = Sprite_ShadowCount;

    Sprite_ShadowCount.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers();
    };

    Sprite_ShadowCount.prototype.initMembers = function () {
        this._count = 0;
        this._battler = null;
        this.anchor.x = 0.5;
        this.anchor.y = 1.5;
        this._color = '#ffffff'
        this._bitmap = new Bitmap(64, 64);
        this._bitmap.textColor = this._color;
        this.stateId = 0;
    };

    Sprite_ShadowCount.prototype.setup = function (battler, stateId) {
        this._battler = battler;
        this.stateId = stateId;
        this.setFrame(0, 0, 64, 64);
    };

    Sprite_ShadowCount.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateBitmap();
    };

    Sprite_ShadowCount.prototype.updateBitmap = function () {
        if (this._battler) {
                var shadow = this._battler.getShadowForState(this.stateId);
                if (shadow) {
                    var count = shadow.hitsleft;
                    if (count !== this._count) {
                        this._count = count;
                        this._bitmap.clear();
                        this._bitmap.drawText(count, 0, 0, 64, 24, "center");

                    }
                }
            else {
                this._bitmap.clear();
                this._count = 0;
            }
        }
    };


    //=================================================================================
    // Sprite_BattlerShadow - super class for Sprite_ActorShadow and Sprite_EnemyShadow
    //=================================================================================


    function Sprite_BattlerShadow() {
        this.initialize.apply(this, arguments);
    }

    Sprite_BattlerShadow.prototype = Object.create(Sprite_Base.prototype);
    Sprite_BattlerShadow.prototype.constructor = Sprite_BattlerShadow;

    Sprite_BattlerShadow.prototype.initialize = function(battler) {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers();
        this.setBattler(battler);
    };

    Sprite_BattlerShadow.prototype.initMembers = function() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._battler = null;
        this._damages = [];
        this._homeX = 0;
        this._homeY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._targetOffsetX = NaN;
        this._targetOffsetY = NaN;
        this._movementDuration = 0;
        this._selectionEffectCount = 0;
        this._tint = 0x00000;
        this._opacity = 255;
        this.mimic = false;
        this.z = 0;
        this.createShadowCountSprite();
        if (Imported.YEP_X_ActSeqPack2){
            this.resetFloat();
            this.setupJump(0, 0);
            this.resetOpacity();
        }

    };

    Sprite_BattlerShadow.prototype.setMimic = function(mimic){
      this.mimic = mimic;
    };

    Sprite_BattlerShadow.prototype.createShadowCountSprite = function(){
      this._shadowCountSprite = new Sprite_ShadowCount();
      this.addChild(this._shadowCountSprite);
    };

    if (Imported.YEP_X_ActSeqPack2){
        Sprite_BattlerShadow.prototype.resetFloat = function() {
            this._floatHeight = 0.0;
            this._floatTarget = 0;
            this._floatDur = 0;
            this._floatRate = 0;
        };

        Sprite_BattlerShadow.prototype.resetOpacity = function() {
            this._opacityTarget = this._opacity;
            this._opacityDur = 0;
            this._opacityRate = 0;
            this._opacityChanging = false;
        };

        Sprite_BattlerShadow.prototype.setupFloat = function(floatHeight, floatDuration) {
            floatDuration = Math.max(1, floatDuration);
            this._floatTarget = floatHeight;
            this._floatDur = floatDuration;
            var rate = Math.abs(this._floatHeight - floatHeight) / floatDuration;
            this._floatRate = rate;
        };

        Sprite_BattlerShadow.prototype.setupJump = function(jumpHeight, jumpDuration) {
            this._jumpHeight = jumpHeight;
            this._jumpDur = jumpDuration;
            this._jumpFull = jumpDuration;
        };

        Sprite_BattlerShadow.prototype.setupOpacityChange = function(target, duration) {
            duration = Math.max(1, duration);
            this._opacityTarget = target;
            this._opacityDur = duration;
            var rate = Math.abs(this.opacity - target) / duration;
            this._opacityRate = rate;
            this._opacityChanging = true;
        };

        Sprite_BattlerShadow.prototype.updateFloat = function() {
            if (!this._battler) return;
            if (this._floatDur > 0) this._floatDur--;
            if (this._jumpDur > 0) this._jumpDur--;
            var baseY = this._battler.anchorY();
            var floatHeight = this.getFloatHeight();
            var jumpHeight = this.getJumpHeight();
            var height = floatHeight + jumpHeight;
            if (this._mainSprite && this._mainSprite.bitmap) {
                this._mainSprite.anchor.y = (baseY + height);
                this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
            } else {
                this.anchor.y = (baseY + height);
            }
        };

        Sprite_BattlerShadow.prototype.updateWeapon = function() {
            if (!this._battler) return;
            if (!this._battler.isActor()) return;
            this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
        };

        Sprite_BattlerShadow.prototype.getFloatHeight = function() {
            if (this._floatDur <= 0) {
                this._floatHeight = this._floatTarget;
            } else {
                var target = this._floatTarget;
                var rate = this._floatRate;
                if (this._floatHeight >= target) {
                    this._floatHeight = Math.max(target, this._floatHeight - rate);
                } else {
                    this._floatHeight = Math.min(target, this._floatHeight + rate);
                }
            }
            return this._floatHeight;
        };

        Sprite_BattlerShadow.prototype.getJumpHeight = function() {
            if (this._jumpDur <= 0) {
                return 0;
            } else {
                var x = this._jumpFull - this._jumpDur;
                var h = this._jumpFull / 2;
                var k = this._jumpHeight;
                var a = -k / Math.pow(h, 2);
                var height = a * Math.pow((x - h), 2) + k;
            }
            return height;
        };

        Sprite_BattlerShadow.prototype.updateOpacity = function() {
            if (this.antiOpacityChange()) return;
            this._opacityDur--;
            if (this._opacityDur <= 0) {
                if (this.opacity !== this._opacityTarget) {
                    this.opacity = this._opacityTarget;
                }
                this._opacityChanging = false;
            } else {
                var target = this._opacityTarget;
                var rate = this._opacityRate;
                if (this.opacity >= target) {
                    this.opacity = Math.max(target, this.opacity - rate);
                } else {
                    this.opacity = Math.min(target, this.opacity + rate);
                }
            }
        };

        Sprite_BattlerShadow.prototype.antiOpacityChange = function() {
            if (!this._opacityChanging) return true;
            return false;
        };

        Sprite_BattlerShadow.prototype.isFloating = function() {
            return this._floatDur > 0;
        };

        Sprite_BattlerShadow.prototype.isJumping = function() {
            return this._jumpDur > 0;
        };

        Sprite_BattlerShadow.prototype.isChangingOpacity = function() {
            return this._opacityDur > 0;
        };
    }


    Sprite_BattlerShadow.prototype.setTint = function (tint){
      this._tint = tint;
    };

    Sprite_BattlerShadow.prototype.setOpacity = function(opacity){
      this._opacity = opacity;
       };

    Sprite_BattlerShadow.prototype.setBattler = function(battler) {
        this._battler = battler;
    };

    Sprite_BattlerShadow.prototype.setHome = function(x, y) {
        this._homeX = x;
        this._homeY = y;
        this.updatePosition();
    };

    Sprite_BattlerShadow.prototype.updatePosition = function() {
        this.x = this._homeX + this._offsetX;
        this.y = this._homeY + this._offsetY;
    };


    Sprite_BattlerShadow.prototype.startMove = function(x, y, duration) {
        if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
            this._targetOffsetX = x;
            this._targetOffsetY = y;
            this._movementDuration = duration;
            if (duration === 0) {
                this._offsetX = x;
                this._offsetY = y;
            }
        }
    };


    Sprite_BattlerShadow.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        if (this._battler) {
            this.updateMain();
            if (Imported.YEP_X_ActSeqPack2){
                this.updateFloat();
                this.updateWeapon();
                this.updateOpacity();
            }
            this.opacity = this._opacity;
        } else {
            this.bitmap = null;
        }
    };

    Sprite_BattlerShadow.prototype.onMoveEnd = function() {
    };

    Sprite_BattlerShadow.prototype.isMoving = function() {
        return this._movementDuration > 0;
    };

    Sprite_BattlerShadow.prototype.inHomePosition = function() {
        return this._offsetX === 0 && this._offsetY === 0;
    };


    Sprite_BattlerShadow.prototype.updateVisibility = function() {
        Sprite_Base.prototype.updateVisibility.call(this);
        if (!this._battler || !this._battler.isSpriteVisible()) {
            this.visible = false;
        }
    };

    Sprite_BattlerShadow.prototype.updateMain = function() {
        if (this._battler.isSpriteVisible()) {
            this.updateBitmap();
            this.updateFrame();
        }
        this.updateMove();
        this.updatePosition();
    };

    Sprite_BattlerShadow.prototype.updateMove = function() {
        if (this._movementDuration > 0) {
            var d = this._movementDuration;
            this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
            this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
            this._movementDuration--;
            if (this._movementDuration === 0) {
                this.onMoveEnd();
            }
        }
    };

    Sprite_BattlerShadow.prototype.updateFrame = function() {
    };

    Sprite_BattlerShadow.prototype.updateBitmap = function() {
    };


    if (Imported.YEP_BattleEngineCore){
        Sprite_BattlerShadow.prototype.stepForward = function() {
            this.startMove(Yanfly.Param.BECStepDist, 0, 12);
        };

        Sprite_BattlerShadow.prototype.stepBack = function() {
            this.startMove(0, 0, 12);
        };

        Sprite_BattlerShadow.prototype.stepFlinch = function() {
            var flinchX = this.x - this._homeX - Yanfly.Param.BECFlinchDist;
            var flinchY = this.y - this._homeY;
            this.startMove(flinchX, flinchY, 6);
        };

        Sprite_BattlerShadow.prototype.stepSubBack = function() {
            var backX = -1 * this.width / 2;
            this.startMove(backX, 0, 6);
        };

        Sprite_BattlerShadow.prototype.stepToSubstitute = function(focus) {
            var target = focus.battler();
            var targetX = (this.x - this._homeX) + (target._homeX - this._homeX);
            var targetY = (this.y - this._homeY) + (target._homeY - this._homeY);;
            if (focus.isActor()) targetX -= this._mainSprite.width / 2;
            if (focus.isEnemy()) targetX += this.width / 2;
            this.startMove(targetX, targetY, 1);
        };

        Sprite_BattlerShadow.prototype.startMotion = function(motionType) {
        };

        Sprite_BattlerShadow.prototype.forceMotion = function(motionType) {
        };

        Sprite_BattlerShadow.prototype.refreshMotion = function() {
        };

        Sprite_BattlerShadow.prototype.startActionMotion = function() {
        };

        Sprite_BattlerShadow.prototype.moveForward = function(distance, frames) {
            distance = parseInt(distance);
            frames = parseInt(frames);
            if (this._battler.isActor()) distance *= -1;
            var moveX = this.x - this._homeX + distance;
            var moveY = this.y - this._homeY;
            this.startMove(moveX, moveY, frames);
        };

        Sprite_BattlerShadow.prototype.moveToPoint = function(pointX, pointY, frames) {
            pointX = parseInt(pointX);
            pointY = parseInt(pointY);
            var targetX = pointX - this._homeX;
            var targetY = pointY - this._homeY;
            this.startMove(targetX, targetY, frames);
        };

        Sprite_BattlerShadow.prototype.setMirror = function(value) {
            if (this.scale.x > 0 && value) this.scale.x *= -1;
            if (this.scale.x < 0 && !value) this.scale.x *= -1;
        };

    }


    //============================================================================
    // Sprite_ActorShadow - sprite used to display actor shadows.
    //============================================================================

    function Sprite_ActorShadow() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ActorShadow.prototype = Object.create(Sprite_BattlerShadow.prototype);
    Sprite_ActorShadow.prototype.constructor = Sprite_ActorShadow;

    Sprite_ActorShadow.MOTIONS = {
        walk:     { index: 0,  loop: true  },
        wait:     { index: 1,  loop: true  },
        chant:    { index: 2,  loop: true  },
        guard:    { index: 3,  loop: true  },
        damage:   { index: 4,  loop: false },
        evade:    { index: 5,  loop: false },
        thrust:   { index: 6,  loop: false },
        swing:    { index: 7,  loop: false },
        missile:  { index: 8,  loop: false },
        skill:    { index: 9,  loop: false },
        spell:    { index: 10, loop: false },
        item:     { index: 11, loop: false },
        escape:   { index: 12, loop: true  },
        victory:  { index: 13, loop: true  },
        dying:    { index: 14, loop: true  },
        abnormal: { index: 15, loop: true  },
        sleep:    { index: 16, loop: true  },
        dead:     { index: 17, loop: true  }
    };

    Sprite_ActorShadow.prototype.initialize = function(battler) {
        Sprite_BattlerShadow.prototype.initialize.call(this, battler);
        this.moveToStartPosition();
    };


    Sprite_ActorShadow.prototype.initMembers = function() {
        Sprite_BattlerShadow.prototype.initMembers.call(this);
        this._battlerName = '';
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;
        this.createWeaponSprite();
        this.createMainSprite();
        this.createStateSprite();
    };

    Sprite_ActorShadow.prototype.setTint = function(tint){
      Sprite_BattlerShadow.prototype.setTint.call(this,tint);
        this._mainSprite.tint = tint;
        this._stateSprite.tint = tint;
        this._weaponSprite.tint = tint;
    };

    Sprite_ActorShadow.prototype.setOpacity = function(opacity){
      Sprite_BattlerShadow.prototype.setOpacity.call(this,opacity);
        this._mainSprite.opacity = opacity;
        this._stateSprite.opacity = opacity;
        this._weaponSprite.opacity = opacity;
    };

    Sprite_ActorShadow.prototype.createMainSprite = function() {
        this._mainSprite = new Sprite_Base();
        this._mainSprite.anchor.x = 0.5;
        this._mainSprite.anchor.y = 1;
        this._mainSprite.opacity = this._opacity;
        this._mainSprite.tint = this._tint;
        this.addChild(this._mainSprite);
    };

    Sprite_ActorShadow.prototype.createWeaponSprite = function() {
        this._weaponSprite = new Sprite_Weapon();
        this._weaponSprite.tint = this._tint;
        this._weaponSprite.opacity = this._opacity;
        this.addChild(this._weaponSprite);
    };

    Sprite_ActorShadow.prototype.createStateSprite = function() {
        this._stateSprite = new Sprite_StateOverlay();
        this._stateSprite.tint = this._tint;
        this._stateSprite.opacity = this._opacity;
        this.addChild(this._stateSprite);
    };

    Sprite_ActorShadow.prototype.setBattler = function(battler) {
        Sprite_BattlerShadow.prototype.setBattler.call(this, battler);
        var changed = (battler !== this._actor);
        if (changed) {
            this._actor = battler;
            if (battler) {
              //  this.setActorHome(battler.index());
            }
            this.startEntryMotion();
            this._stateSprite.setup(battler);
        }
    };

    Sprite_ActorShadow.prototype.moveToStartPosition = function() {
        this.startMove(300, 0, 0);
    };

    Sprite_ActorShadow.prototype.setActorHome = function(index) {
        this.setHome(600 + index * 32, 280 + index * 48);
    };

    Sprite_ActorShadow.prototype.update = function() {
        Sprite_BattlerShadow.prototype.update.call(this);
        if (this._actor) {
            this.updateMotion();
        }
    };

    Sprite_ActorShadow.prototype.updateMain = function() {
        Sprite_BattlerShadow.prototype.updateMain.call(this);
        if (this._actor.isSpriteVisible() && !this.isMoving()) {
            this.updateTargetPosition();
        }
    };

    Sprite_ActorShadow.prototype.setupMotion = function() {
        if (this._actor.isMotionRequested()) {
            this.startMotion(this._actor.motionType());
            this._actor.clearMotion();
        }
    };

    Sprite_ActorShadow.prototype.setupWeaponAnimation = function() {
        if (this._actor.isWeaponAnimationRequested()) {
            this._weaponSprite.setup(this._actor.weaponImageId());
            this._actor.clearWeaponAnimation();
        }
    };

    Sprite_ActorShadow.prototype.startMotion = function(motionType) {
        var newMotion = Sprite_ActorShadow.MOTIONS[motionType];
        if (this._motion !== newMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_ActorShadow.prototype.updateTargetPosition = function() {
        if (this._actor.isInputting() || this._actor.isActing()) {
            this.stepForward();
        } else if (this._actor.canMove() && BattleManager.isEscaped()) {
            this.retreat();
        } else if (!this.inHomePosition()) {
            this.stepBack();
        }
    };

    Sprite_ActorShadow.prototype.updateBitmap = function() {
        Sprite_BattlerShadow.prototype.updateBitmap.call(this);
        var name = this._actor.battlerName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadSvActor(name);
            this._mainSprite.tint = this._tint;
            this._mainSprite.opacity = this._opacity;
        }
    };

    Sprite_ActorShadow.prototype.updateFrame = function() {
        Sprite_BattlerShadow.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            var pattern = this._pattern < 3 ? this._pattern : 1;
            var cw = bitmap.width / 9;
            var ch = bitmap.height / 6;
            var cx = Math.floor(motionIndex / 6) * 3 + pattern;
            var cy = motionIndex % 6;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_ActorShadow.prototype.updateMove = function() {
        var bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            Sprite_BattlerShadow.prototype.updateMove.call(this);
        }
    };

    Sprite_ActorShadow.prototype.updateMotion = function() {
        this.setupMotion();
        this.setupWeaponAnimation();
        if (this._actor.isMotionRefreshRequested()) {
            this.refreshMotion();
            this._actor.clearMotion();
        }
        this.updateMotionCount();
    };

    Sprite_ActorShadow.prototype.updateMotionCount = function() {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            } else if (this._pattern < 2) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    Sprite_ActorShadow.prototype.motionSpeed = function() {
        return 12;
    };

    Sprite_ActorShadow.prototype.refreshMotion = function() {
        var actor = this._actor;
        if (actor) {
            var stateMotion = actor.stateMotionIndex();
            if (actor.isInputting() || actor.isActing()) {
                this.startMotion('walk');
            } else if (stateMotion === 3) {
                this.startMotion('dead');
            } else if (stateMotion === 2) {
                this.startMotion('sleep');
            } else if (actor.isChanting()) {
                this.startMotion('chant');
            } else if (actor.isGuard() || actor.isGuardWaiting()) {
                this.startMotion('guard');
            } else if (stateMotion === 1) {
                this.startMotion('abnormal');
            } else if (actor.isDying()) {
                this.startMotion('dying');
            } else if (actor.isUndecided()) {
                this.startMotion('walk');
            } else {
                this.startMotion('wait');
            }
        }
    };

    Sprite_ActorShadow.prototype.startEntryMotion = function() {
        if (this._actor && this._actor.canMove()) {
            this.startMotion('walk');
            this.startMove(0, 0, 30);
        } else if (!this.isMoving()) {
            this.refreshMotion();
            this.startMove(0, 0, 0);
        }
    };

    Sprite_ActorShadow.prototype.stepForward = function() {
        this.startMove(-48, 0, 12);
    };

    Sprite_ActorShadow.prototype.stepBack = function() {
        this.startMove(0, 0, 12);
    };

    Sprite_ActorShadow.prototype.retreat = function() {
        this.startMove(300, 0, 30);
    };

    Sprite_ActorShadow.prototype.onMoveEnd = function() {
        Sprite_Battler.prototype.onMoveEnd.call(this);
        if (!BattleManager.isBattleEnd()) {
            this.refreshMotion();
        }
    };

    if (Imported.YEP_BattleEngineCore){
        Sprite_ActorShadow.prototype.setActorHome = function(index) {
            var screenWidth = Graphics.boxWidth;
            var screenHeight = Graphics.boxHeight;
            var maxSize = $gameParty.maxBattleMembers();
            var partySize = $gameParty.battleMembers().length;
            var statusHeight = eval(Yanfly.Param.BECCommandRows);
            statusHeight *= Window_Base.prototype.lineHeight.call(this);
            statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
            if ($gameSystem.isSideView()) {
                var homeX = eval(Yanfly.Param.BECHomePosX);
                var homeY = eval(Yanfly.Param.BECHomePosY);
            } else {
                var homeX = eval(Yanfly.Param.BECFrontPosX);
                var homeY = eval(Yanfly.Param.BECFrontPosY);
            }
            this._checkAliveStatus = false;
            if ($gameParty.battleMembers()[index]) {
                var actor = $gameParty.battleMembers()[index];
                if (actor.isAlive()) this._checkAliveStatus = true;
            }
            this.setHome(homeX, homeY);
            this.moveToStartPosition();
        };

        Sprite_ActorShadow.prototype.moveToStartPosition = function() {
            if (BattleManager._bypassMoveToStartLocation) return;
            if ($gameSystem.isSideView() && this._checkAliveStatus) {
                this.startMove(300, 0, 0);
            }
        };

        Sprite_ActorShadow.prototype.setupMotion = function() {
        };

        Sprite_ActorShadow.prototype.forceMotion = function(motionType) {
            var newMotion = Sprite_ActorShadow.MOTIONS[motionType];
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        };

        Sprite_ActorShadow.prototype.updateTargetPosition = function() {
        };

        Sprite_ActorShadow.prototype.updateMotion = function() {
            this.updateMotionCount();
        };

        Sprite_ActorShadow.prototype.onMoveEnd = function() {
            Sprite_BattlerShadow.prototype.onMoveEnd.call(this);
        };

        Sprite_ActorShadow.prototype.stepForward = function() {
            this.startMove(-Yanfly.Param.BECStepDist, 0, 12);
        };

        Sprite_ActorShadow.prototype.stepFlinch = function() {
            var flinchX = this.x - this._homeX + Yanfly.Param.BECFlinchDist;
            var flinchY = this.y - this._homeY;
            this.startMove(flinchX, flinchY, 6);
        };

        Sprite_ActorShadow.prototype.stepSubBack = function() {
            var backX = this._mainSprite.width / 2;
            this.startMove(backX, 0, 6);
        };

    }

    //============================================================================
    // Sprite_EnemyShadow - sprite used to display actor shadows.
    //============================================================================

    function Sprite_EnemyShadow() {
        this.initialize.apply(this, arguments);
    }

    Sprite_EnemyShadow.prototype = Object.create(Sprite_BattlerShadow.prototype);
    Sprite_EnemyShadow.prototype.constructor = Sprite_EnemyShadow;

    Sprite_EnemyShadow.prototype.initialize = function(battler) {
        Sprite_BattlerShadow.prototype.initialize.call(this, battler);
    };

    Sprite_EnemyShadow.prototype.initMembers = function() {
        Sprite_BattlerShadow.prototype.initMembers.call(this);
        this._enemy = null;
        this._appeared = false;
        this._battlerName = '';
        this._battlerHue = 0;
        this._effectType = null;
        this._effectDuration = 0;
        this._shake = 0;
      //  this.createStateIconSprite();
    };

    Sprite_EnemyShadow.prototype.createStateIconSprite = function() {
        this._stateIconSprite = new Sprite_StateIcon();
        this.addChild(this._stateIconSprite);
    };


    Sprite_EnemyShadow.prototype.setBattler = function(battler) {
        Sprite_BattlerShadow.prototype.setBattler.call(this, battler);
        this._enemy = battler;
        this.setHome(battler.screenX(), battler.screenY());
    //    this._stateIconSprite.setup(battler);
    };

    Sprite_EnemyShadow.prototype.update = function() {
        Sprite_BattlerShadow.prototype.update.call(this);
        if (this._enemy) {
            this.updateEffect();
          //  this.updateStateSprite();
        }
    };

    Sprite_EnemyShadow.prototype.updateBitmap = function() {
        Sprite_BattlerShadow.prototype.updateBitmap.call(this);
        var name = this._enemy.battlerName();
        var hue = this._enemy.battlerHue();
        if (this._battlerName !== name || this._battlerHue !== hue) {
            this._battlerName = name;
            this._battlerHue = hue;
            this.loadBitmap(name, hue);
            this.tint = this._tint;
            this.opacity = this._opacity;
            this.initVisibility();
        }
    };

    Sprite_EnemyShadow.prototype.loadBitmap = function(name, hue) {
        if ($gameSystem.isSideView()) {
            this.bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            this.bitmap = ImageManager.loadEnemy(name, hue);
        }
    };

    Sprite_EnemyShadow.prototype.updateFrame = function() {
        Sprite_BattlerShadow.prototype.updateFrame.call(this);
        var frameHeight = this.bitmap.height;
        if (this._effectType === 'bossCollapse') {
            frameHeight = this._effectDuration;
        }
        this.setFrame(0, 0, this.bitmap.width, frameHeight);
    };

    Sprite_EnemyShadow.prototype.updatePosition = function() {
        Sprite_BattlerShadow.prototype.updatePosition.call(this);
        this.x += this._shake;
    };

    Sprite_EnemyShadow.prototype.updateStateSprite = function() {
        this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
        if (this._stateIconSprite.y < 20 - this.y) {
            this._stateIconSprite.y = 20 - this.y;
        }
    };

    Sprite_EnemyShadow.prototype.initVisibility = function() {
        this._appeared = this._enemy.isAlive();
        if (!this._appeared) {
            this.opacity = 0;
        }
    };

    Sprite_EnemyShadow.prototype.setupEffect = function() {
        if (this._appeared && this._enemy.isEffectRequested()) {
            this.startEffect(this._enemy.effectType());
            this._enemy.clearEffect();
        }
        if (!this._appeared && this._enemy.isAlive()) {
            this.startEffect('appear');
        } else if (this._appeared && this._enemy.isHidden()) {
            this.startEffect('disappear');
        }
    };

    Sprite_EnemyShadow.prototype.startEffect = function(effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case 'appear':
                this.startAppear();
                break;
            case 'disappear':
                this.startDisappear();
                break;
            case 'whiten':
                this.startWhiten();
                break;
            case 'blink':
                this.startBlink();
                break;
            case 'collapse':
                this.startCollapse();
                break;
            case 'bossCollapse':
                this.startBossCollapse();
                break;
            case 'instantCollapse':
                this.startInstantCollapse();
                break;
        }
        this.revertToNormal();
    };

    Sprite_EnemyShadow.prototype.startAppear = function() {
        this._effectDuration = 16;
        this._appeared = true;
    };

    Sprite_EnemyShadow.prototype.startDisappear = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_EnemyShadow.prototype.startWhiten = function() {
        this._effectDuration = 16;
    };

    Sprite_EnemyShadow.prototype.startBlink = function() {
        this._effectDuration = 20;
    };

    Sprite_EnemyShadow.prototype.startCollapse = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_EnemyShadow.prototype.startBossCollapse = function() {
        this._effectDuration = this.bitmap.height;
        this._appeared = false;
    };

    Sprite_EnemyShadow.prototype.startInstantCollapse = function() {
        this._effectDuration = 16;
        this._appeared = false;
    };

    Sprite_EnemyShadow.prototype.updateEffect = function() {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            switch (this._effectType) {
                case 'whiten':
                    this.updateWhiten();
                    break;
                case 'blink':
                    this.updateBlink();
                    break;
                case 'appear':
                    this.updateAppear();
                    break;
                case 'disappear':
                    this.updateDisappear();
                    break;
                case 'collapse':
                    this.updateCollapse();
                    break;
                case 'bossCollapse':
                    this.updateBossCollapse();
                    break;
                case 'instantCollapse':
                    this.updateInstantCollapse();
                    break;
            }
            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    };

    Sprite_EnemyShadow.prototype.isEffecting = function() {
        return this._effectType !== null;
    };

    Sprite_EnemyShadow.prototype.revertToNormal = function() {
        this._shake = 0;
        this.blendMode = 0;
        this.opacity = 255;
        this.setBlendColor([0, 0, 0, 0]);
    };

    Sprite_EnemyShadow.prototype.updateWhiten = function() {
        var alpha = 128 - (16 - this._effectDuration) * 10;
        this.setBlendColor([255, 255, 255, alpha]);
    };

    Sprite_EnemyShadow.prototype.updateBlink = function() {
        this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
    };

    Sprite_EnemyShadow.prototype.updateAppear = function() {
        this.opacity = (16 - this._effectDuration) * 16;
    };

    Sprite_EnemyShadow.prototype.updateDisappear = function() {
        this.opacity = 256 - (32 - this._effectDuration) * 10;
    };

    Sprite_EnemyShadow.prototype.updateCollapse = function() {
        this.blendMode = Graphics.BLEND_ADD;
        this.setBlendColor([255, 128, 128, 128]);
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
    };

    Sprite_EnemyShadow.prototype.updateBossCollapse = function() {
        this._shake = this._effectDuration % 2 * 4 - 2;
        this.blendMode = Graphics.BLEND_ADD;
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
        this.setBlendColor([255, 255, 255, 255 - this.opacity]);
        if (this._effectDuration % 20 === 19) {
            SoundManager.playBossCollapse2();
        }
    };

    Sprite_EnemyShadow.prototype.updateInstantCollapse = function() {
        this.opacity = 0;
    };


})(Anima.ShadowPartner);

ShadowPartner = Anima.ShadowPartner;
Imported["Anima_ShadowPartnerRewrite"] = 1.08;