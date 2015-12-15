/*=============================================================================
 * Anima - Shield States
 * By Liquidize - www.mintkit.lol
 * Anima_ShieldStates.js
 * Version: 1.07
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_ShieldStates>
 * @author Liquidize
 *
 * @param defaultColorStart
 * @desc Default starting color of the shield state bars.
 * @default #FF0000
 *
 * @param defaultColorEnd
 * @desc Default ending color of the shield state bars.
 * @default #FF0000
 *
 * @param defaultFormula
 * @desc Default formula used to calculate shield effectiveness.
 * It simply uses the actors max hp.
 * @default value = a.mhp;
 *
 * @param showGaugesDefault
 * @desc Are shield health gauges shown by default?
 * @default true
 *
 * @param defaultUseAttackElement
 * @desc By default, should we also use the attacker element(s) when checking elemental shields?
 * @default true
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
 * Anima Shield States
 * ============================================================================
 * Anima Shield States is a plugin that provides the user with the ability to
 * add different types of "Shields" to actors and enemies. These shields
 * are simple states in the database with special notetags to enable the shield.
 * When an actor or enemy has a shield, the shield will either absorb or reflect
 * some of the damage that the actor or enemy was meant to take. In the process
 * if the shield(s) reflect or absorb all the damage, then the actor or enemy
 * takes no damage. Otherwise the actor or enemy will take all the left over
 * damage. Shields have "health" and when that health is depleted, the shield is
 * removed, unless the shield is set to be persistent. Upon removal of the shield
 * the actor also loses the state. Shields get their Health pool through a formula
 * that works similar to how damage formulas work, except in a notetag. Meaning
 * you are capable of using any variable, or javascript code within the formula
 * for the shields. Shields can also regenerate their HP over time (turns). At
 * the end of an actors turn, a shield if it is set to do so, will regenerate a
 * percentage of the shields maximum health. This allows for persistent shields
 * that can be used as passives that need time to recharge. Shields can also
 * be given element weaknesses, using a notetag and supplying the element ids
 * separated by a comma. You are then able to apply a weakness rate that allows
 * damage done to the shield to be multiplied to deal more damage against specific
 * shields (e.g: If a shield is weak to fire, fire element abilities could deal
 * 2x the damage.)
 * Shields can be bypassed by using special notetags on any type of game object.
 * Examples of these could be: Actors, Enemies, Items, Weapons, Armors, Skills, or States.
 * These bypasses can be given a type of shield to bypass: all, certain hit shields, magic,
 * or physical. There also exist an option for 'none', but that is set by default
 * if the notetags don't exist and means that a particular ability is unable to bypass
 * any shield.
 *
 * The visual aspect of a shield is through the usage of status icons.
 * If a shield state is given a status icon, then when that status icon is drawn
 * in any menu or scene a bar(similar to Health and Mana for actors) is drawn on
 * the icon. This bar is customizable meaing you are able to change the gradient colors,
 * have the bar display under the icon, and even on the icon itself.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * The following are the possible notetags and their usage. Notetags are case
 * insensitive, so you can use all capitals,all lower case, or any combination.
 *
 * ============================================================================
 * State Notetags - To create a shield.
 * ============================================================================
 *
 * <Shield: x>
 *
 *     WHAT IT DOES: This is a must have tag. When applied to a state
 *     it grants the state a shield effect, the effect is based on the
 *     value of x.
 *
 *     USAGE:
 *          Where x is specify the type of shield, it can be any of
 *          the following. Reflect (For reflection shields) or Absorb
 *          (For absorption shields). You can also use the full name
 *          Reflection and Absorption.
 *
 *          NOTE AS OF 1.04: Mana shields have been added, you are able
 *          to use Mana as a value for x to have the target of the attack
 *          (the person/enemy with the shield) absorb the damage through
 *          their mana. These shields work the same way as normal shields
 *          in that shields have a max amount they're allowed to use,
 *          however if a shield is set to be mana, the damage is still
 *          taken, just through the targets mana if the targets mana
 *          is greater or equal to the amount the shield can take.
 *          Mana Reflection shields also exist, these work in the same
 *          way as reflection shields, except the damage reflected is
 *          dealt the the attackers mana, and not their health.
 *
 *          Valid Values For x (case does not matter):
 *                            reflect
 *                            absorb
 *                            reflection
 *                            absorption
 *                            mana
 *                            mp
 *                            mpreflect
 *                            manareflect
 *                            mana reflect
 *                            mana reflection
 *
 *
 * <Shield Type: x> or <stype: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies that this state is a shield,
 *                 without this the state will not be a shield.
 *                 The type of shield designated by 'x' is what type of
 *                 attacks this shield can absorb.
 *     USAGE:
 *           Where x is either "all", "certain", "magic", or "physical"
 *           (without the quotes). Certain is "certain hit" attacks.
 *           Magic is Magical Attacks, Physical is Physical Attacks
 *           and all is every attack type. This tag is optional and
 *           if left out it is assumed the shield can block all types.
 *
 * <Shield Color: x> or <scolor: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the starting color of the shields
 *                 status icon gauge gradient. If this notetag doesn't exist
 *                 it will use the default color specified in the parameters.
 *                 This notetag takes an HTML/HEX Color code where x is.
 *     USAGE:
 *          Where x is, place an HTML/HEX Color code. If you don't use the
 *          default color set in the parameters (This tag is optional).
 *
 * <Shield Color End: x> or <scolorend: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the ending color of the shields
 *                 status icon gauge gradient. If this notetag doesn't exist
 *                 than it will use the default color specified in the parameters.
 *                 This notetag takes a html/hex color code where x is.
 *
 *    USAGE:
 *          Where x is, place an HTML/HEX Color code. If you don't use the
 *          default color set in the parameters (This tag is optional).
 *
 *
 * <Shield Weakness: x,y,z,a,b,c> or <sweakness: x,y,z,a,b,c>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the list of elements this shield is
 *                 weak too. It is their ID seperated by a comma, followed by
 *                 another ID if more than 1.
 *     USAGE:
 *          Give a list of element ID's (found in system tab of database).
 *          Separated by a comma (e.g: 1,2,3,4,5). This tag is optional, and if
 *          left out it is assumed that this shield has no weakness.
 *
 * <Shield Weakness Rate: x%> or <sweakrate: x%>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the % of extra damage this shield
 *                 should take if hit by an element that it is weak to.
 *                 It is multiplied by the damage done to the shield and thus
 *                 should be higher than 100% for bonus damage, and lower for
 *                 reduced damage. Shield damage is calculated
 *                 as follows: (damage * shieldrate)* weaknessrate
 *    USAGE:
 *          Where x is placed a number followed by a % sign. (e.g: 100%)
 *          Higher numbers (more than 100%) mean more damage done to the shield
 *          if an element the shield is weak to hits it. Lower numbers indicate
 *          less damage. This tag is optional, and if left out then the damage
 *          done to the shield is multiplied by 100% (1.0) and thus no bonus damage
 *          is done.
 *
 * <Shield Gauge Below: x> or <sgaugebelow :x>
 *
 *     WHAT IT DOES:
 *                 This tag specifies that the shields health/gauge bar
 *                 should be displayed slightly below the icon of the state
 *                 itself when drawn.
 *     USAGE:
 *          Where x is, specify true or false. If true the gauge is drawn below
 *          the status icon for the shield. By default this value is false. This tag
 *          is optional, and if left out the shield system will use the default value.
 *
 * <Shield Persist: x> or <spersist: x>
 *
 *     WHAT IT DOES:
 *                 This tag specifies that the shield/state is persistent, and
 *                 should not be removed if the shields health goes to 0 or below.
 *                 This is useful for passive shields or states.
 *     USAGE:
 *          Where x is specify true or false. If true the shield is persistent
 *          This notetag is optional and if left out it is assumed the shield
 *          is not persistent. It will be  removed once the health of the shield
 *          reaches 0 or below.
 *
 * <Shield Rate: x%> or <srate: x%>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the percentage of damage the shield
 *                 should reflect,or absorb. By default it is 100%. Anything
 *                 higher than 100% results in more damage, than is actually
 *                 done. Anything lower than 100% causes the shield to absorb
 *                 or reflect only a portion of the damage done, while other
 *                 shields, or the target takes the rest.
 *
 *     USAGE:
 *          Where x is specify a percentage number (the % sign is a must).
 *          This is the percentage of damage the shield will take.
 *          By default this value is 100%, this note tag is optional.
 *
 * <Shield Heal Rate: x%> or <shealrate:x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies the percentage of the shields
 *                 maximum health (IF GREATER THAN 0 AND NO FORMULA FOR
 *                 HEALING IS GIVEN) that the shield will heal at the
 *                 end of the battlers turn.
 *
 *    USAGE:
 *         Where x is specify a percentage number (the % sign is a must).
 *         This is the percent of damage the shield will take.
 *         By default this value is 0%, and thus the shield does not heal
 *         anything at the end of the turn. This notetag is optional.
 *
 * <Shield Draw Gauge: x> or <sdrawgauge: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies whether or not the health gauge
 *                 of this shield should be drawn.
 *
 *     USAGE:
 *          Where x is specify true or false. If true the gauge is drawn,
 *          if false it is not. By default this uses whatever you have set
 *          in your parameters. This notetag is optional.
 *
 * <Shield Friendly Bypass: x> or <sallowfriends: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies whether or not this shield allows
 *                 friends of the battler with the shield to do things to
 *                 them. Automatically bypassing the shield. This is useful
 *                 for heals, and the such.
 *
 *     USAGE:
 *          Where x is specify true or false, if true teammates can do
 *          actions to this target, bypassing this shield. If false
 *          friendlies can not do things to this target, and their actions
 *          are absorbed or reflected by the shield. By default this is true,
 *          this notetag is optional.
 *
 * <Shield Reapply On Renew: x> or <sreapply: x>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies whether or not this shields health
 *                 pool is renewed/reapplied when the state is renewned or
 *                 reapplied to the battler. This is useful for shields that
 *                 have variance in their formulas, to allow the player
 *                 to try to get a higher health shield.
 *
 *    USAGE:
 *         Where x is specify true or false. If true the shields health is
 *         renewed when the stat is reapplied next. If false, the shields
 *         health will remain the same as it was before being renewed. This
 *         notetag is optional and by default is set to false.
 *
 * <Shield Formula> or <sformula>
 *
 *     WHAT IT DOES:
 *                 This notetag is given to indicate the start of the shield
 *                 health/effectiveness formula area.
 *     USAGE:
 *          See the shield formula section for more information. This notetag
 *          while technically not optional, is however. If left out than
 *          the shield will use the formula specified in the parameters.
 *
 * </Shield Formula> or </sformula>
 *
 *      WHAT IT DOES:
 *                  This notetag is given to a state to specify the end of a
 *                  states shield formula area. Anything past this notetag
 *                  is read as something else or nothing at all.
 *      USAGE:
 *           See the shield formula section for more information. This notetag
 *           should not be used without a starting <Shield Formula> tag. However
 *           this notetag is optional if and ONLY if you are not using a <Shield Formula>
 *           tag.
 *
 *  <Shield Heal Formula> or <shealformula>
 *
 *      WHAT IT DOES:
 *                  This notetag is given to the state to specify a healing
 *                  formula. This is used when the shield should heal itself
 *                  at the end of the battlers turn. It is the opening tag
 *                  to the formula, and must be accompanied by a formula then
 *                  </Shield Heal Formula>. Please see the Healing formula
 *                  section for more information on healing formulas.
 *     USAGE:
 *          See the healing formula section.
 *
 * </Shield Heal Formula> or </shealformula>
 *
 *      WHAT IT DOES:
 *                 This notetag is given to the state to specify the end to a
 *                 healing formula. This is used when the shield should heal
 *                 itself at the end of the battlers turn. It is the closing
 *                 tag to the formula, and must be preceded by a formula then
 *                 <Shield Heal Formula>. Please see the Healing formula
 *                 section for more information on healing formulas.
 *     USAGE:
 *          See the healing formula section.
 *
 * <Shield Elements: x,y,z> or <selements: x,y,z>
 *
 *     WHAT IT DOES:
 *                 This notetag is given to the state to specify that the shield
 *                 on the state will only protect from attacks with the elements
 *                 specified in the array.
 *     USAGE:
 *           Specify an array of element IDs you want the shield to block for
 *           separated by a comma. e.g: 1,2,3.
 *
 *           When this notetag is not given, it is assumed the shield can
 *           protect from all elements.
 *
 * <Shield Use Attack Element: true|false> or <suseatkelement: true|false>
 *
 *     WHAT IT DOES:
 *                 This notetag specifies whether or not we will also use the
 *                 attackers elements (from states,or weapons,etc) when checking
 *                 if the shield can protect from the attack. If this notetag
 *                 isn't given then the value given in the parameters is used
 *                 by default.
 *
 *     USAGE:
 *          Specify true or false to check the attackers, attack elements when
 *          seeing if an element exist.
 * ============================================================================
 * Actor,Enemy,Item,Skill,Weapon,Armor,and State Notetags - used to bypass
 * ============================================================================
 *
 * The following notetags are used in any of the aforementioned database
 * objects:
 *
 * <Shield Bypass: x> or <sbypass: x>
 *
 *      WHAT IT DOES:
 *                  This tag, used within any of the database object mentioned
 *                  in the header, will grant the affected actor or enemy the
 *                  ability to bypass a shield of the type defined by x.
 *      USAGE:
 *           Where x is, use any of the following: all, magic, physical, certain or
 *           none. However none is not needed, as its assumed that if this tag
 *           does not exist than the object does not have the ability to grant
 *           the actor or enemy with this object (be it equipped,or as a state,
 *           or what have you) the ability to bypass any type of shield.
 *           As mentioned before, this tag is optional.
 *
 * ============================================================================
 * Plugin Command(s)
 * ============================================================================
 *
 * I've included a simple plugin command to allow you to modify the Health
 * of a shield given its stateId and the actor id of the actor in your party.
 *
 * AnimaShieldStates actorid stateid newvalue
 *
 * newvalue is the value you want to set the health of the shield to, if the
 * shields max health is below this, than the max health is also set to this.
 * If newvalue is 0 or below, and the shield is not a persistent shield, then
 * the shield (and thus the state) are removed. If the actor, or state doesn't
 * exist nothing will happen.
 *
 * ============================================================================
 * More on bypassing, and my lovely flawed logic :(
 * ============================================================================
 *
 * Bypassing may appear odd. This is because if you have a shield set to absorb
 * 'all' types of damage, but you have a bypass object that has its bypass
 * property set to well, anything other than none will allow the attack to
 * go through the shield. Assuming the attack is also the type that the bypass is
 * set to (e.g: Bypass is set to 'certain' and the attack is also 'certain hit').
 * My logic behind this is, even though the shield is able to block 'all' attacks,
 * since there is a bypass present, that can go through 'certain' hit shields than
 * the shields defenses for this type of attack will be compromised, and thus
 * the attack will go through. A magic or physical attack will not go through, but
 * because the fact that you have a bypass with 'certain' as its type, and the attack
 * is 'certain hit' than the attack will go through the shields defenses for 'certain'.
 *
 * That is my lovely, possibly flawed logic. If you disagree please feel free to
 * speak up, I will adjust these things according to popular demand or
 * optional "On/Off" parameters.
 *
 * ============================================================================
 * Shield Formula Stuff
 * ============================================================================
 *
 * Shields effectiveness, aka their 'health', is determined by formulas
 * similar to that used by the damage formula section of the
 * skills tab. In fact it's exactly the same, except for you are
 * able to execute javascript code within the shields formula.
 *
 * The following are variables you can use in your shield formulas:
 *
 * user,subject,a = The person who is using the skill or item.
 *
 * target,b = The target of the skill or item.
 *
 * v = the games variables $gameVariables
 *
 * s = the games switches $gameSwitches
 *
 * item = the skill or item.
 *
 * value = the health or value manipulated. The health of the shield is this value.
 *
 * You are able to access any stat from the target or subject the same as you
 * could in damage formulas.
 *
 * The following are example formulas you can use:
 *
 * PLEASE NOTE SINCE THIS IS EVALUATED AS JAVASCRIPT A ; IS NEEDED AT THE
 * END OF EVERY LINE.
 *
 * Simple 500 health shield.
 * <Shield Formula>
 *     value = 500;
 * </Shield Formula>
 *
 * A shield that is 10 * the users max hp.
 * <Shield Formula>
 *     value = 10;
 *     value = value * a.mhp;
 * </Shield Formula>
 *
 * ============================================================================
 * Shield Healing Formula
 * ============================================================================
 *
 * Using the shield healing formula tags work in the same fashion as the shield
 * formula tags. There are only two key differences, and they are the following:
 *
 * 1. The 'target' and 'b' variables are the same as the 'user','subject' and 'a'
 * variables. This is due to the fact that, there is no other battler to use, its
 * assumed that its the same as the battler with shield. However if you want to
 * use stats from other actors in your healing formula, you can use the methods
 * from $gameParty, or $gameActors to do so.
 *
 * 2. Healing rate is automatically set to 100%, if healing rate is 0%. This can
 * be changed following the shield healing formula tags to allow for more dynamic
 * and flexible healing formulas. This is then multiplied by the amount to be
 * healed by. The full equation for how much health of the shield that is healed is:
 * (Your Formula) * healing rate
 * If your formula is improper javascript, or the healing rate is changed to 0%,
 * than the shield heals nothing. If the healing rate is anything below
 * 100% than it only heals a portion of the amount from the formula.
 *
 * ============================================================================
 * Adding Shields from Events
 * ============================================================================
 * Due to the fact that when you are adding a state to an Actor or Enemy from
 * events, there is no "Subject" and only a "Target" that the state will be added
 * to. Target and Subject (and thus user,a, and b) are interchangeable. See #1
 * in the Shield Healing Formula section, for more information. It is the same
 * issue basically.
 *
 * ============================================================================
 * OTHER NOTES
 * ============================================================================
 *
 * This plugin overwrites the function used to draw actor icons on the screen.
 * If another plugin overwrites this function than depending on your plugin setup
 * and order of them, either gauges will not be drawn, or whatever that plugin
 * overwrites to do will not happen. This plugins overwrite acts as the same
 * draw actor icons function as the original version, except if a shield exists
 * for that state, it will draw a gauge. If not than just the icon.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.07:
 *             - Added elemental shields.
 *
 * Version 1.06:
 *             - Fixed a graphical issue when using YEP_AutoPassiveStates.
 *
 * Version 1.05:
 *             - Added compatibility with Anima_StatesCore. Place this
 *             below it in the plugin list.
 *             - Removed the ability to add shield states via event commands,
 *             it didn't work how i wanted and would hang your game.
 *
 * Version 1.04:
 *             - Fixed a bug that when parsing <Shield: x> tag it would not
 *             detect capitals.
 *             - Fixed some issues with the code that caused shields to not
 *             properly be calculated due to passing the wrong variables.
 *             - Added Mana Shields and Mana Reflection shields (see help).
 *
 * Version 1.03:
 *             - Fixed buff icons.
 *
 * Version 1.02:
 *             - Fixed a graphical glitch that caused states applied more than
 *             once to not properly show the shield values.
 *             - Added the ability too give shields using the Event Commands
 *             (see notes).
 *             - Added the ability to have shield regeneration done via formula.
 *             - Changed how shields are made for future updates.
 *             - Added parameter to turn on/off the drawing of shield
 *             gauges.
 *             - Added notetag to turn on/off the drawing of a shield gauge.
 *             - Changed it so friendlies can now bypass all shields by default.
 *             - Added notetag to turn off allowing friendlies to bypass the shield.
 *             - Shield damage is now rounded, to prevent floating point damage.
 *             - Added a notetag to enable shields health/effect to be reapplied/renewed
 *             when renewing or re-adding the state (useful for shields that can have variance
 *             in their health pools).
 *             - Changed how some notetags are written, to add consistency and better
 *             clarity.
 *
 * Version 1.01:
 *             - Fixed an issue that caused a type error.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.ShieldStates = Anima.ShieldStates || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_ShieldStates>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_ShieldStates parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    // validate parameters
    $.Param.defaultColorStart = String($.Parameters.defaultColorStart);
    $.Param.defaultColorEnd = String($.Parameters.defaultColorEnd);
    $.Param.defaultFormula = String($.Parameters.defaultFormula);
    $.Param.showGaugesDefault = eval($.Parameters.showGaugesDefault);
    $.Param.useAttackElement = eval($.Parameters.defaultUseAttackElement);
    //============================================================================
    // Database Manager
    //============================================================================

    // DatabaseManager loading
    var shieldStateDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!shieldStateDataManager_isDatabaseLoaded.call(this)) return false;
        this.processShieldStateNotetags($dataStates);
        this.processShieldBypassNotetags($dataStates);
        this.processShieldBypassNotetags($dataItems);
        this.processShieldBypassNotetags($dataArmors);
        this.processShieldBypassNotetags($dataWeapons);
        this.processShieldBypassNotetags($dataSkills);
        this.processShieldBypassNotetags($dataActors);
        this.processShieldBypassNotetags($dataEnemies);
        return true;
    };

    // Process state notetags to determine if a state is a shield, and properly
    // setup that information.
    DataManager.processShieldStateNotetags = function (group) {
        var note1 = /<(?:Shield Type|stype):[ ](all|magic|physical|certain)>/i;
        var note2 = /<(?:Shield):[ ](reflect|absorb|reflection|absorption|mana|mp|mpreflect|manareflect|mana reflect|mana reflection)>/i;
        var note3 = /<(?:Shield Color|scolor):[ ](#[0-9a-fA-F]+)>/i;
        var note4 = /<(?:Shield Color End|scolorend):[ ](#[0-9a-fA-F]+)>/i;
        var note5 = /<(?:Shield Rate|srate):[ ](\d+)([%ï¼…])>/i;
        var note6 = /<(?:Shield Weakness|sweakness):[ ](([0-9]+,?)+)>/i;
        var note7 = /<(?:Shield Weakness Rate|sweakrate):[ ](\d+)([%ï¼…])>/i;
        var note8 = /<(?:Shield Heal Rate|shealrate):[ ](\d+)([%ï¼…])>/i;
        var note9 = /<(?:Shield Reapply On Renew|sreapply):[ ](true|false)>/i;
        var note10 = /<(?:Shield Draw Gauge|sdrawgauge):[ ](true|false)>/i;
        var note11 = /<(?:Shield Persist|spersist):[ ](true|false)>/i;
        var note12 = /<(?:Shield Gauge Below|sgaguebelow):[ ](true|false)>/i;
        var note13 = /<(?:Shield Friendly Bypass|sallowfriends):[ ](true|false)>/i;
        var note14 = /<(?:Shield Elements|selements):[ ](([0-9]+,?)+)>/i;
        var note15 = /<(?:Shield Use Attack Element|suseatkelement):[ ](true|false)>/i;
        for (var n = 1; n < group.length; n++) {

            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.shield = {};
            obj.isshield = false;
            obj.shield.reflect = false;
            obj.shield.mana = false;
            obj.shield.iconbelow = false;
            obj.shield.weaknesses = [];
            obj.shield.weaknessrate = 1.0;
            obj.shield.rate = 1.0;
            obj.shield.friendlybypass = true;
            obj.shield.reapplyonrenew = false;
            obj.shield.drawgauge = $.Param.showGaugesDefault;
            obj.shield.healrate = 0.0;
            obj.shield.healformula = '';
            obj.shield.startcolor = $.Param.defaultColorStart;
            obj.shield.endcolor = $.Param.defaultColorEnd;
            obj.shield.type = "all";
            obj.shield.formula = $.Param.defaultFormula;
            obj.shield.ispersist = false;
            obj.shield.elementals = [];
            obj.shield.useattackelement = $.Param.useAttackElement;
            var formula = false;
            var healformula = false;
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note2)) {
                    var kind = RegExp.$1.toLowerCase();
                    switch (kind) {
                        case "reflection":
                        case "reflect":
                            obj.isshield = true;
                            obj.shield.reflect = true;
                            break;
                        case "absorb":
                        case "absorption":
                            obj.isshield = true;
                            break;
                        case "mana":
                        case "mp":
                            obj.isshield = true;
                            obj.shield.mana = true;
                            break;
                        case "mpreflect":
                        case "manareflect":
                        case "mana reflect":
                        case "mana reflection":
                            obj.isshield = true;
                            obj.shield.mana = true;
                            obj.shield.reflect = true;
                            break;
                    }
                } else if (line.match(note1)) {
                    obj.shield.type = RegExp.$1.toLowerCase();
                } else if (line.match(note3)) {
                    obj.shield.startcolor = RegExp.$1;
                } else if (line.match(note4)) {
                    obj.shield.endcolor = RegExp.$1;
                } else if (line.match(note5)) {
                    obj.shield.rate = parseFloat(RegExp.$1 * 0.01);
                } else if (line.match(note6)) {
                    var weaknesses = RegExp.$1.split(',');
                    for (var i = 0; weaknesses.length; i++) {
                        obj.shield.weaknesses[i] = weaknesses[i];
                    }
                } else if (line.match(note7)) {
                    obj.shield.weaknessrate = parseFloat(RegExp.$1 * 0.01);
                } else if (line.match(note8)) {
                    obj.shield.healrate = parseFloat(RegExp.$1 * 0.01);
                }
                else if (line.match(note9)) {
                    obj.shield.reapplyonrenew = eval(RegExp.$1);
                } else if (line.match(note10)) {
                    obj.shield.drawgauge = eval(RegExp.$1);
                } else if (line.match(note12)) {
                    obj.shield.iconbelow = eval(RegExp.$1);
                } else if (line.match(note11)) {
                    obj.shield.ispersist = eval(RegExp.$1);
                } else if (line.match(note13)) {
                    obj.shield.friendlybypass = eval(RegExp.$1);
                } else if (line.match(note14)) {
                    var elements = RegExp.$1.split(',');
                    elements.forEach(function (element) {
                        obj.shield.elementals.push(Number(element));
                    });
                } else if (line.match(note15)) {
                    obj.shield.useattackelement = eval(RegExp.$1);
                } else if (line.match(/<(?:Shield Formula|sformula)>/i)) {
                    formula = true;
                } else if (line.match(/<\/(?:Shield Formula|sformula)>/i)) {
                    formula = false;
                } else if (formula) {
                    obj.shield.formula = obj.shield.formula + line + ' ';
                } else if (line.match(/<(?:Shield Heal Formula|shealformula)>/i)) {
                    healformula = true;
                } else if (line.match(/<\/(?:Shield Heal Formula|shealformula)>/i)) {
                    formula = false;
                } else if (healformula) {
                    if (obj.shield.healrate === 0.0) {
                        obj.shield.healrate = 1.0;
                    }
                    obj.shield.healformula = obj.shield.healformula + line + ' ';
                }
            }
        }
    };

    // Process shield bypassing notetags for items and skills,and weapons and armor.
    DataManager.processShieldBypassNotetags = function (group) {
        var note1 = /<(?:Shield Bypass|sbypass):[ ](all|magic|physical|certain|none)>/i;
        for (var n = 1; n < group.length; n++) {

            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.shield = obj.shield || {};
            obj.shield.bypass = "none";


            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.shield.bypass = RegExp.$1;
                }
            }
        }
    };

    //============================================================================
    // Game_Battler
    //============================================================================

    // Initialize this.
    var shieldStatesGameBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        shieldStatesGameBattler_initMembers.call(this);
        this.animashields = [];
    };

    // Get all bypass shields given by states.
    Game_Battler.prototype.stateBypassShields = function () {
        var shields = [];
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.shield && state.shield.bypass !== "none") {
                shields[i] = state;
            }
        }
        return shields;
    };

    // Get the bypass shield, if one exist from this battlers own object.
    Game_Battler.prototype.bypassShield = function () {
        if (this.shield && this.shield.bypass !== "none") {
            return this.shield;
        }
        return null;
    };

    // Get every bypass shield.
    Game_Battler.prototype.allBypassShields = function () {

        var aShield = this.bypassShield();
        var stateShield = this.stateBypassShields();
        var shields = [];

        if (aShield !== null) {
            shields = shields.concat(aShield);
        }

        if (stateShield.length > 0) {
            shields = shields.concat(stateShield);
        }

        if (this.isActor()) {
            var equipShields = this.equipBypassShields();
            if (equipShields.length > 0) {
                shields = shields.concat(equipShields);
            }
        }
        return shields;

    };

    //  Regenerate shields every turn based off their heal rate.
    var shieldStatesGameBattler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function () {
        shieldStatesGameBattler_onTurnEnd.call(this);

        if (this.animashields && this.animashields.length > 0) {
            for (var i = 0; i < this.animashields.length; i++) {
                var state = $dataStates[this.animashields[i].stateId];
                if (state.shield.healrate > 0.0) {

                    var healing = this.animashields[i].maxhealth * state.shield.healrate;
                    if (state.shield.healformula.length > 0) {
                        healing = Math.round(this.evalAnimaShieldHealFormula(state.shield) * state.shield.healrate);
                    }
                    if (healing + this.animashields[i].health > this.animashields[i].maxhealth) {
                        this.animashields[i].health = this.animashields[i].maxhealth;
                    } else {
                        this.animashields[i].health += healing;
                    }
                }


            }
        }
    };

    Game_Battler.prototype.evalAnimaShieldHealFormula = function (shield) {
        try {
            var a = this;
            var b = this;
            var user = this;
            var subject = this;
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var value = 0;
            if (shield.healformula) {
                eval(shield.healformula);
            }
            return value;
        } catch (e) {
            return 0;
        }
    };

    // Remove states.
    var shieldStatesGameBattler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function (stateId) {
        if (this.animashields && this.animashields.length > 0) {
            for (var i = 0; i < this.animashields.length; i++) {
                if (this.animashields[i].stateId === stateId) {
                    this.animashields.splice(i, 1);
                }
            }
        }

        shieldStatesGameBattler_removeState.call(this, stateId);

    };

    //============================================================================
    // Game_Actor
    //============================================================================

    // Get an array of all shield bypass information from all equipment.
    Game_Actor.prototype.equipBypassShields = function () {
        var shields = [];
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var obj = equips[i];
            if (obj !== null && obj.shield && obj.shield.bypass !== "none") {
                shields[i] = obj.shield;
            }
        }
        return shields;
    };

    //============================================================================
    // Game_Action
    //============================================================================

    var shieldStatesGameAction_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function (target, effect) {
        var state = $dataStates[effect.dataId];
        if (state && state.isshield && state.shield) {
            var animashield = {};
            animashield.maxhealth = this.makeAnimaShield(target, state);
            animashield.health = animashield.maxhealth;
            animashield.stateId = state.id;
            if (target.isStateAffected(state.id)) {
                target.animashields.forEach(function (shield) {
                    if (shield.stateId === state.id && state.shield.reapplyonrenew) {
                        shield.maxhealth = animashield.maxhealth;
                        shield.health = shield.maxhealth;
                    }
                });
            } else {
                target.animashields.push(animashield);
            }
        }
        shieldStatesGameAction_itemEffectAddState.call(this, target, effect);
    };

    var shieldStatesGameAction_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function (target, value) {
        var result = target.result();
        if (value === 0) {
            result.critical = false;
        }

        var realdamage = value;

        if (target.animashields.length > 0) {
            for (var i = 0; i < target.animashields.length; i++) {
                if (target.animashields[i].health > 0) {
                    var state = $dataStates[target.animashields[i].stateId];
                    if (!this.canBypassShield(state.shield)) {
                        if (state.shield.elementals.length > 0) {
                            if (state.shield.elementals.contains(this.item().damage.element) !== true) {
                                if (state.shield.useattackelement) {
                                   var attackelements = this.subject().attackElements();
                                    var elementfound = false;
                                    for (var element = 0; element < attackelements.length; element++){
                                        if (state.shield.elementals.contains(attackelements[element])) {
                                            elementfound = true;
                                            break;
                                        }
                                    }
                                    if (elementfound === false) {
                                        continue;
                                    }
                                } else {
                                    continue;
                                }
                            }
                        }
                        var weaknessrate = 1.0;
                        if (state.shield.weaknesses.contains(this.item().damage.elementId)) weaknessrate = state.shield.weaknessrate;
                        var damage = (realdamage * state.shield.rate) * weaknessrate;
                        if (damage > target.animashields[i].health) {
                            damage = target.animashields[i].health;
                        }
                        if (state.shield.mana) {
                            if (target.mp < damage) {
                                damage = target.mp;

                            }
                            if (!state.shield.reflect) {
                                this.executeMpDamage(target, Math.round(damage));
                            }
                        }
                        realdamage = Math.max(realdamage - damage, 0);
                        target.animashields[i].health = Math.round(target.animashields[i].health - damage);
                        if (state.shield.reflect) {
                            var reflection = new Game_Action(target);
                            reflection.setSubject(target);
                            reflection.setTarget(this.subject());
                            reflection.setItemObject(this.item());
                            if (state.shield.mana) {
                                reflection.executeMpDamage(this.subject(), Math.round(damage));
                            } else {
                                reflection.executeDamage(this.subject(), Math.round(damage));
                            }
                        }
                    }
                }
            }
            for (var j = 0; j < target.animashields.length; j++) {
                var state = $dataStates[target.animashields[j].stateId];
                if (state && !state.shield.ispersist) {
                    if (target.animashields[j].health <= 0) {
                        target.removeState(target.animashields[j].stateId);
                    }
                }
            }
        }

        shieldStatesGameAction_executeDamage.call(this, target, Math.round(realdamage));

    };

    // Get the hit type in word form, for shields.
    Game_Action.prototype.getWordedHitType = function () {
        if (this.isCertainHit()) {
            return "certain";
        } else if (this.isPhysical()) {
            return "physical";
        } else if (this.isMagical()) {
            return "magic";
        } else {
            return ""
        }
    };

    // Can we bypass this shield?
    Game_Action.prototype.canBypassShield = function (shield) {
        var hittype = this.getWordedHitType();
        var bypasshields = this.subject().allBypassShields();

        if (shield.friendlybypass && (this.isForUser() || this.isForDeadFriend() || this.isForFriend())) {
            return true;
        }

        if (this.item().shield && this.item().shield.bypass !== "none") bypasshields.push(this.item().shield);
        if (shield.type !== 'all') {
            if (hittype !== shield.type) {
                return true;
            } else {
                for (var i = 0; i < bypasshields.length; i++) {
                    var bypass = bypasshields[i];
                    if (bypass.bypass === "all") {
                        return true;
                    } else {
                        if (bypass.bypass === shield.type || shield.type === 'all') {
                            return true;
                        }
                    }

                }
            }
        } else {
            for (var i = 0; i < bypasshields.length; i++) {
                var bypass = bypasshields[i];
                if (bypass.bypass === "all") {
                    return true;
                } else {
                    if (bypass.bypass === shield.type || shield.type === 'all') {
                        return true;
                    }
                }
            }
        }
        return false;

    };

    // Make the anima shield values.
    Game_Action.prototype.makeAnimaShield = function (target, state) {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var user = this.subject();
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var subject = this.subject();
        var shield = state.shield;
        var value = Math.round(this.evalShieldFormula(target, state));
        return value < 0 ? 0 : value;
    };

    // Calculate the anima shield.
    Game_Action.prototype.evalShieldFormula = function (target, state) {
        try {
            var item = this.item();
            var a = this.subject();
            var b = target;
            var user = this.subject();
            var subject = this.subject();
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var value = 0;
            if (state.shield.formula) {
                eval(state.shield.formula);
            }
            return value;
        } catch (e) {
            return 0;
        }
    };


    //============================================================================
    // Window_Base
    //============================================================================

    Window_Base.prototype.drawActorShieldStatus = function (actor, x, y, width) {
        width = width || 144;
        var index = 0;
        var states = actor.states().slice(0, Math.floor(width / Window_Base._iconWidth));
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.iconIndex > 0) {
                if (state.isshield) {
                    var shield = null;
                    for (var s = 0; s < actor.animashields.length; s++) {
                        if (actor.animashields[s].stateId === state.id) {
                            shield = actor.animashields[s];
                            break;
                        }
                    }
                    if (shield !== null) {
                        if (state.shield.drawgauge) {
                            var color1 = state.shield.startcolor;
                            var color2 = state.shield.endcolor;
                            var gx = x + Window_Base._iconWidth * index;
                            var gy = y - 2;
                            if (state.shield.iconbelow) gy = y + 11;

                            this.drawGauge(gx, gy, Window_Base._iconHeight, (shield.health / shield.maxhealth), color1, color2);
                        }
                    }
                }
                index += 1;
            }
        }
    };

    var shieldStateWindowBase_drawActorIcons = Window_Base.prototype.drawActorIcons;
    // Overwrite drawActorIcons
    Window_Base.prototype.drawActorIcons = function (actor, x, y, width) {
        shieldStateWindowBase_drawActorIcons.call(this, actor, x, y, width);
        this.drawActorShieldStatus(actor, x, y, width);
    };

    //============================================================================
    // Game_Interpreter - Plugin Commands & Event "State Change"
    //============================================================================

    // Special anima shield evaluation for events.
    // since you can't specify what is causing the state to be added,
    // its assumed that a and b (subject and target) are the same thing
    // which is the thing having the state added.
    Game_Interpreter.prototype.evalAnimaShield = function (target, state) {
        try {
            var a = target;
            var b = target;
            var user = target;
            var subject = target;
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var shield = state.shield;
            var value = 0;
            if (shield.formula) {
                eval(shield.formula);
            }
            return value;
        } catch (e) {
            return 0;
        }
    };


    var shieldStatesGameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {

        if (command === "AnimaShieldStates") {
            if (args.length < 3) {
                console.warn("Anima_ShieldStates: Trying too use PluginCommand with invalid arguments.");
                return;
            }

            var actorId = Number(args[0] || -1);
            var stateId = Number(args[1] || -1);
            var value = Number(args[2] || 0);
            var actor = null;

            if (actorId === -1 || stateId === -1) {
                console.warn("Anima_ShieldStates: Entered an invalid actor or state id. Not doing stuff.");
                return;
            }

            if (value <= 0) {
                console.warn("Anima_ShieldStates: Value entered is 0 or invalid, we will be removing the state.");
            }

            for (var i = 0; i < $gameParty.members().length; i++) {
                if ($gameParty.members()[i]._actorId == actorId) {
                    actor = $gameParty.members()[i];
                }
            }

            if (actor === null) {
                console.warn("Anima_ShieldStates: No actor with id " + actorId + " found in party.");
                return;
            }

            if (!actor.isStateAffected(stateId)) {
                console.warn("Anima_ShieldStates: No state with id " + stateId + " found on actor.");
                return;
            }

            for (var i = 0; i < actor.animashields.length; i++) {
                var shield = actor.animashields[i];
                if (shield.stateId === stateId) {
                    if (shield.maxhealth < value) shield.maxhealth = value;
                    shield.health = value;
                }

                if (shield.health <= 0 && !$dataStates[shield.stateId].shield.ispersist) {
                    actor.removeState(shield.stateId);
                }
            }

        } else {
            shieldStatesGameInterpreter_pluginCommand.call(this, command, args);
        }
    };


})(Anima.ShieldStates);

ShieldStates = Anima.ShieldStates;
Imported["Anima_ShieldStates"] = 1.07;