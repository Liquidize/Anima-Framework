/*=============================================================================
 * Anima - Overtime Effects
 * By Liquidize - http://anima.mintkit.lol
 * Anima_OvertimeEffects.js
 * Version: 1.05
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_OvertimeEffects>
 * @author Liquidize
 *
 * @param Default Variance
 * @desc Default variance amount used in damage overtime effects.
 * @default 20
 *
 * @param Time Based Effects
 * @desc Should overtime effects be time/tick based?
 * true = tick based effects. false = effects apply at the end of turns.
 * @default false
 *
 * @param Single Tick
 * @desc Are effects applied all at once, or individually?
 * true = all at once | false = individually
 * @default true
 *
 * @param Show Damage Popup
 * @desc Should we show popups for healing and damage?
 * @default true
 *
 * @param Apply Tick On Gain
 * @desc Should we apply the effect right away when we gain the state?
 * @default false
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
 * Anima Overtime Effects
 * ============================================================================
 * Anima Overtime Effects is a plugin that enables you to give states effects
 * that happen overtime. Such as damage over time (DoT) and heal over time (Hot)
 * effects. These are popular effects in many games, and now you can do them
 * too! Rather simply if I might add! Originally meant to be apart of the
 * Anima States Core plugin, this is now an independent plugin.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * - Currently "Time Based Effects" only work with Yanfly Battle Engine
 *
 * ============================================================================
 * NOTE TAGS
 * ============================================================================
 * The following are the possible notetags and their usage. Notetags are case
 * insensitive, so you can use all capitals,all lower case, or any combination.
 *
 * ============================================================================
 * State ONLY Notetags
 * ============================================================================
 * The following are note tags only usable for states.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Overtime Effect> and </Overtime Effect>
 *
 * ALIASES: <overtime> and </overtime>
 *
 * WHAT THEY DO:
 *             The above note tags are used to signify the start and end of an
 *             overtime effects data block on a state.
 *
 * USAGE:
 *      When you want a state to have an overtime effect, apply both of these and
 *      then set the overtime effect parameters using other tags.
 *
 * EXAMPLE:
 *        <Overtime Effect>
 *        </Overtime Effect>
 *
 *        <overtime>
 *        </overtime>
 *
 * EXPLANATION:
 *            Signifies the start and end of an overtime block.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the state will not have an
 *          overtime effect, and thus no effect is created.
 * ----------------------------------------------------------------------------
 * ============================================================================
 * Overtime Attributes
 * ============================================================================
 * The following are attributes used to determine the effect of an overtime
 * effect. These are used within <Overtime> ATTRIBUTES </Overtime>.
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    HEAL: <x>
 *
 * ALIASES:
 *    HEALING: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine whether the effect
 *             heals,or damages the target.
 *
 * USAGE:
 *      Where <x> is specify true for healing, false for damage.
 *
 * EXAMPLE:
 *        HEAL: false
 *        HEAL: true
 *        HEALING: false
 *        HEALING: TRUE
 *
 * EXPLANATION:
 *            Signifies that the effect is either a Damage overtime, or
 *            heal overtime effect.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will be a damage
 *          overtime.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    VARIANCE: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine the percentage
 *             of variance on the formula, similar to damage formulas
 *             for skills.
 *
 * USAGE:
 *      Where <x> is specify the variance amount.
 *
 * EXAMPLE:
 *        VARIANCE: 20
 *        VARIANCE: 5
 *        VARIANCE: 0
 *
 * EXPLANATION:
 *            Signifies the variance amount on the damage or healing of
 *            this effect.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will use the default
 *          variance.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    STAT: <x>
 *
 * ALIASES:
 *    PARAMETER: <x>
 *    PARAM: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine which parameter of the
 *             target is affected by this overtime effect.
 *
 * USAGE:
 *      Where <x> is specify one of the allowed parameters.
 *
 * EXAMPLE:
 *        STAT: HP
 *        STAT: MP
 *        PARAM: TP
 *        PARAMETER: TATICALPOINTS
 *        PARAMETER: MANA
 *        STAT: HEALTH
 *
 * EXPLANATION:
 *            Signifies which stat is affected by this attribute, allowed
 *            stats are TP,MP, and HP with aliases such as TATICALPOINTS,
 *            MANA,and HEALTH.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will affect the HP
 *          stat.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    ELEMENT: <x>
 *
 *
 * ALIASES:
 *    ELEMENTAL TYPE: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine which element, if any
 *             the effect is.
 *
 * USAGE:
 *      Where <x> is specify an element id.
 *
 * EXAMPLE:
 *        ELEMENT: 1
 *        ELEMENTAL TYPE: 10
 *        ELEMENTAL TYPE: 5
 *        ELEMENT: 3
 *
 * EXPLANATION:
 *            Signifies the elemental damage, if any the effect applies.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will not have any
 *          element.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    SAME DAMAGE: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine whether or not the state
 *             applies the same damage or healing every tick. Meaning, that if it
 *             does the damage/healing is calculated only once.
 *
 * USAGE:
 *      Where <x> is specify true or false.
 *
 * EXAMPLE:
 *        SAME DAMAGE: false
 *        SAME DAMAGE: true
 *
 * EXPLANATION:
 *            Signifies whether the same amount of damage or healing is applied
 *            every time the effect is applied. If true then yes, if false then
 *            no and damage/healing will be calculated every time the effect
 *            ticks.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will not apply the
 *          same amount of damage every tick.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    STACK EFFECT: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine whether or not the state
 *             applies the effect multiple times, aka stacking. If set to false
 *             then the effect is only applied once, and not again until that effect
 *             falls off.
 *
 * USAGE:
 *      Where <x> is specify true or false.
 *
 * EXAMPLE:
 *        STACK EFFECT: false
 *        STACK EFFECT: true
 *
 * EXPLANATION:
 *            Signifies whether the state stacks this effect, if true the effect
 *            is applied multiple times, if false, the effect is applied only once.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will not stack the
 *          effect.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    STACK MAX: <x>
 *
 * WHAT THEY DO:
 *             The above attribute is used to set the maximum amount of time a effect
 *             can stack. This must be 1 or higher.
 *
 * USAGE:
 *      Where <x> is specify 1 or higher.
 *
 * EXAMPLE:
 *        STACK MAX: 5
 *        STACK MAX: 2
 *
 * EXPLANATION:
 *            Signifies whether the effect has a maximum stack amount of x.
 *
 * OPTIONAL:
 *          Yes, if not specified it is assumed the effect will have no stack limit.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * TAG(S):
 *    <Formula> and </Formula>
 *
 * WHAT THEY DO:
 *             The above attribute is used to determine the start and end
 *             of the formula calculation section of an effect.
 *
 * USAGE:
 *      <Formula> value = formulastuffhere; </Formula>
 *
 * EXAMPLE:
 *        <Formula>
 *            value = a.mhp * 10 - b.def * 2;
 *        </Formula>
 *
 * EXPLANATION:
 *            Specifies the start and end of the region used to calculate the
 *            formula of the effect. Lines and text occupying the region are
 *            evaluated as javascript code. See the formula section of the
 *            help for more information.
 *
 * OPTIONAL:
 *          No, this is required in order for the state to apply healing or
 *          damage.
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Damage/Healing Formula Information
 * ============================================================================
 * Text within the <Formula></Formula> attributes is evaluated as javascript,
 * and therefore complicated formulas can exist for your effects. The following
 * variables are given to you for calculating the damage/healing of formulas.
 *
 * value = the amount of damage/healing done, this value is returned and thus
 * must be used.
 *
 * actor = the one applying the effect.
 *
 * attacker = same as actor
 *
 * a = same as actor
 *
 * target = the one with the effect on them.
 *
 * b = same as target
 *
 * s = $gameSwitches;
 *
 * v = $gameVariables;
 *
 * ============================================================================
 * Full Examples
 * ============================================================================
 * <Overtime Effect>
 *     STAT: HP
 *     VARIANCE: 30
 *     ELEMENT: 1
 *     <Formula>
 *         value = 10 * a.atk;
 *     </Formula>
 * <Overtime Effect>
 *
 *     The above example creates an effect that damages HP, with elemental
 *     damage with the element with id 1. The variance of the damage is 30%
 *     and the damage formula is 10 times the attack of the battler applying the
 *     state.
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.05:
 *             - Fixed an issue with stacking effects.
 *
 * Version 1.04:
 *             - Fixed an issue where 'same damage' effects were not applying.
 *
 * Version 1.03:
 *             - Fixed an issue where an effect would apply to dead enemies.
 *
 * Version 1.02:
 *             - Fixed an issue where if a battler died via an overtime effect
 *               they would remain on the battlefield.
 *
 * Version 1.01:
 *             - Fixed an issue where not having 'StatesCore' caused an
 *               undefined error.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/
var Imported = Imported || {};
var Anima = Anima || {};
Anima.OvertimeEffects = Anima.OvertimeEffects || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_OvertimeEffects>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_OvertimeEffects parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};

    $.Param.defaultDamageVariance = Number($.Parameters['Default Variance'] || 20);
    $.Param.isTickBased = eval($.Parameters['Time Based Effects']);
    $.Param.applyTickOnGain = eval($.Parameters['Apply Tick On Gain']);
    $.Param.isSingleTick = eval($.Parameters['Single Tick']);
    $.Param.showPopups = eval($.Parameters['Show Damage Popup']);
    //============================================================================
    // Database Manager
    //============================================================================

    // DatabaseManager loading
    var overtimeEffectsDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!overtimeEffectsDataManager_isDatabaseLoaded.call(this)) return false;
        this.processStateOvertimeNotetags($dataStates);
        return true;
    };

    DataManager.processStateOvertimeNotetags = function (group) {
        var note1 = /(?:Variance):[ ](\d+)/i;
        var note2 = /(?:STAT|parameter|param):[ ](.*)/i;
        var note3 = /(?:HEAL|healing):[ ](true|false)/i;
        var note4 = /(?:ELEMENT|elemental type):[ ](\d+)/i;
        var note5 = /(?:SAME DAMAGE):[ ](true|false)/i;
        var note6 = /(?:STACK EFFECT|Stack):[ ](true|false)/i;
        var note7 = /(?:STACK LIMIT:Stack Max):[ ](\d+)/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);
            obj.oteffects = [];

            var formula = false;
            var otinfo = false;
            var otobj = {};
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:OVERTIME EFFECT|overtime)>/i)) {
                    otobj = {};
                    otobj.healing = false;
                    otobj.formula = '';
                    otobj.variance = $.Param.defaultDamageVariance;
                    otobj.element = 0;
                    otobj.stat = 0;
                    otobj.samedmg = false;
                    otobj.stack = false;
                    otobj.stackmax = -1;
                    otinfo = true;
                } else if (line.match(/<\/(?:OVERTIME EFFECT|overtime)>/i)) {
                    obj.oteffects.push(otobj);
                    otinfo = false;
                    otobj = null;
                }
                if (otinfo) {
                    if (line.match(note1)) {
                        otobj.variance = Number(RegExp.$1);
                    } else if (line.match(note2)) {
                        var stat = Anima.OvertimeEffects.getDmgOverTimeParam(RegExp.$1);
                        otobj.stat = stat;
                    } else if (line.match(note3)) {
                        otobj.healing = eval(RegExp.$1);
                    } else if (line.match(note4)) {
                        otobj.element = Number(RegExp.$1);
                    } else if (line.match(note5)) {
                        otobj.samedmg = eval(RegExp.$1);
                    } else if (line.match(note6)) {
                        otobj.stack = eval(RegExp.$1);
                    } else if (line.match(note7)) {
                        otobj.stackmax = parseInt(RegExp.$1);
                    }
                    else if (line.match(/<(?:FORMULA)>/i)) {
                        formula = true;
                    } else if (line.match(/<\/(?:FORMULA)>/i)) {
                        formula = false;
                    } else if (formula) {
                        otobj.formula = otobj.formula + line + ' ';
                    }
                }
            }
        }

    };

    //=============================================================================
    // Static Functions
    //=============================================================================

    Anima.OvertimeEffects.getDmgOverTimeParam = function (paramString) {
        paramString = paramString.toUpperCase();
        switch (paramString) {
            case "HP":
            case "HEALTH":
            case "LIFE":
                return 0;
                break;
            case "MP":
            case "MANA":
                return 1;
                break;
            case "SPIRIT": // Specific to my own game.
            case "SPI":
                return 2;
                break;
            case "RAGE": // Specific to my own game.
            case "RAG":
                return 3;
                break;
            case "TP":
            case "TATICALPOINTS":
                return 4;
                break;
        }
        return 0;
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    var overtimeEffectsGameBattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function () {
        overtimeEffectsGameBattlerBase_clearStates.call(this);
        this.oteffects = [];
        this.ottick = 1;
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================


    var overtimeEffectsGameBattler_updateTick = Game_Battler.prototype.updateTick;
    Game_Battler.prototype.updateTick = function () {
        overtimeEffectsGameBattler_updateTick.call(this);
        if (this.isDead()) return;
        if ($.Param.isTickBased) {
            var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
            this.ottick -= value;
            if (this.ottick <= 0) {
                this.updateOvertimeEffects();
                this.ottick = 1;
            }
        }

    };

    var overtimeEffectsGameBattler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function () {
        overtimeEffectsGameBattler_onTurnEnd.call(this);
        if (this.isDead()) return;
        if (!$.Param.isTickBased) {
            this.updateOvertimeEffects();
        }
    };

    Game_Battler.prototype.evalOvertimeFormula = function (oteffect) {
        try {
            var value = 0;
            var actor = oteffect.attacker;
            var attacker = oteffect.attacker;
            var a = oteffect.attacker;
            var target = this;
            var b = this;
            var s = $gameSwitches;
            var v = $gameVariables;
            eval(oteffect.effect.formula);
            value = value * this.getOvertimeElementRate(oteffect);
            if (oteffect.effect.variance > 0) {
                value = Game_Action.prototype.applyVariance.call(this, value, oteffect.effect.variance);
            }

            return Math.round(value);
        } catch (e) {
            console.warn(e);
            return 0;
        }
    };

    Game_Battler.prototype.applyOvertimeEffect = function (oteffect) {
        var damage = 0;
        var mpdamage = 0;
        var tpdamage = 0;

        if (oteffect.damage == 0 && oteffect.effect.samedmg) {
            oteffect.damage = this.evalOvertimeFormula(oteffect);
        }
        if (oteffect.effect.samedmg != true) {
            oteffect.damage = this.evalOvertimeFormula(oteffect);
        }
        if (oteffect.effect.healing) {
            switch (oteffect.effect.stat) {
                case 0:
                    damage -= oteffect.damage * oteffect.stackcount;
                    break;
                case 1:
                    mpdamage -= oteffect.damage * oteffect.stackcount;
                    break;
                case 4:
                    tpdamage -= oteffect.damage * oteffect.stackcount;
                    break;
            }
        } else {
            switch (oteffect.effect.stat) {
                case 0:
                    damage += oteffect.damage * oteffect.stackcount;
                    break;
                case 1:
                    mpdamage += oteffect.damage * oteffect.stackcount;
                    break;
                case 4:
                    tpdamage += oteffect.damage * oteffect.stackcount;
                    break;
            }
        }

        this.gainHp(-damage);
        this.gainMp(-mpdamage);
        this.gainTp(-tpdamage);
        if (damage > 0) {
            this.onDamage(damage);
        }
        if ((damage !== 0 || mpdamage !== 0 || tpdamage !== 0) && $gameParty.inBattle() && $.Param.showPopups) {
            this.startDamagePopup();
        }

        if (this.hp <= 0) {
            this.addState(this.deathStateId());
            this.performCollapse();
        }

    };

    Game_Battler.prototype.getOvertimeElementRate = function (oteffect) {
        if (oteffect.effect.element < 0) {
            if (oteffect.attacker.attackElements().length > 0) {
                return Math.max.apply(null, oteffect.attacker.attackElements().map(function (elementId) {
                    return this.elementRate(elementId);
                }, this))
            }
        } else if (oteffect.effect.element > 0) {
            return this.elementRate(oteffect.effect.element);
        }
        return 1;
    };

    var overtimeEffectsGameBattler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function (stateId) {
        overtimeEffectsGameBattler_removeState.call(this, stateId);
        for (var i = 0; i < this._oteffects.length; i++) {
            if (this._oteffects[i].stateid === stateId) {
                this._oteffects.splice(i, 1);
            }
        }
    };

    var overtimeEffectsGameBattler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function () {
        overtimeEffectsGameBattler_onBattleEnd.call(this);
        this._oteffects = [];
        this.ottick = 1;
    };

    Game_Battler.prototype.reapplyOvertimeEffects = function () {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.oteffects.length > 0) {
                for (var e = 0; e < state.oteffects.length; e++) {
                    var oteffectobj = {};
                    oteffectobj.attacker = this;
                    oteffectobj.effect = state.oteffects[e];
                    oteffectobj.stateid = state.id;
                    oteffectobj.damage = null;
                    this._oteffects.push(oteffectobj);
                }
            }
        }
    };

    Game_Battler.prototype.updateOvertimeEffects = function () {
        // Reapply effects if the effects array is undefined
        // it should be noted that the attacker is set to this
        // battler using this.
        if (this._oteffects === undefined) {
            this._oteffects = [];
            this.ottick = 1;
            this.reapplyOvertimeEffects();
        }
        var damage = 0;
        var mpdamage = 0;
        var tpdamage = 0;
        for (var i = 0; i < this._oteffects.length; i++) {
            var oteffect = this._oteffects[i];
            if ($.Param.isSingleTick !== true) {
                this.applyOvertimeEffect(oteffect);
            } else {
                if (oteffect.damage == 0 && oteffect.effect.samedmg) {
                    oteffect.damage = this.evalOvertimeFormula(oteffect);
                }
                if (oteffect.effect.samedmg != true) {
                    oteffect.damage = this.evalOvertimeFormula(oteffect);
                }
                if (oteffect.effect.healing) {
                    switch (oteffect.effect.stat) {
                        case 0:
                            damage -= oteffect.damage * oteffect.stackcount;
                            break;
                        case 1:
                            mpdamage -= oteffect.damage * oteffect.stackcount;
                            break;
                        case 4:
                            tpdamage -= oteffect.damage * oteffect.stackcount;
                            break;
                    }
                } else {
                    switch (oteffect.effect.stat) {
                        case 0:
                            damage += oteffect.damage * oteffect.stackcount;
                            break;
                        case 1:
                            mpdamage += oteffect.damage * oteffect.stackcount;
                            break;
                        case 4:
                            tpdamage += oteffect.damage * oteffect.stackcount;
                            break;
                    }
                }
            }
        }
        if ($.Param.isSingleTick) {
            this.gainHp(-damage);
            this.gainMp(-mpdamage);
            this.gainTp(-tpdamage);
            if (damage > 0) {
                this.onDamage(damage);
            }
            if ((damage !== 0 || mpdamage !== 0 || tpdamage !== 0) && $gameParty.inBattle() &&  $.Param.showPopups) {
                this.startDamagePopup();
            }

            if (this.hp <= 0) {
                this.addState(this.deathStateId());
                this.performCollapse();
            }

        }
    };

    var overtimeEffectsGameBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        overtimeEffectsGameBattler_initMembers.call(this);
        this._oteffects = [];
        this.ottick = 1;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var overtimeEffectsGameAction_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
    Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
        overtimeEffectsGameAction_itemEffectAddNormalState.call(this, target, effect);
        if (target._oteffects === undefined) {
            target._oteffects = [];
            target.ottick = 1;
        }
        var state = $dataStates[effect.dataId];
        if (state) {
            if (state.oteffects.length !== 0) {
                for (var o = 0; o < state.oteffects.length; o++) {
                    var oteffectobj = {};
                    oteffectobj.attacker = this.subject();
                    oteffectobj.effect = state.oteffects[o];
                    oteffectobj.stateid = state.id;
                    oteffectobj.damage = 0;
                    oteffectobj.stackcount = 1;

                    var hasEffect = false;
                    var targetEffect = null;
                    for (var i = 0; i < target._oteffects.length; i++) {
                        if (target._oteffects[i].effect === oteffectobj.effect) {
                            hasEffect = true;
                            targetEffect = target._oteffects[i];
                            break;
                        }
                    }
                    if (hasEffect) {
                        if (oteffectobj.effect.stack) {
                            if (targetEffect !== null) {
                                if (targetEffect.effect.stackmax !== -1) {
                                    if ((targetEffect.stackcount + 1) > targetEffect.effect.stackmax) {
                                        targetEffect.stackcount = targetEffect.effect.stackmax;
                                    } else {
                                        targetEffect.stackcount += 1;
                                    }
                                } else {
                                    targetEffect.stackcount += 1;
                                }
                            }
                        }
                    } else {
                        if ($.Param.applyTickOnGain) {
                            target.applyOvertimeEffect(oteffectobj);
                        }
                        target._oteffects.push(oteffectobj);
                    }
                }
            }
        }
    };

})(Anima.OvertimeEffects);

OvertimeEffects = Anima.OvertimeEffects;
Imported["Anima_OvertimeEffects"] = 1.05;