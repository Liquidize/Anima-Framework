/*=============================================================================
 * Anima - Party Health
 * By Liquidize - www.mintkit.lol
 * Anima_PartyHP.js
 * Version: 1.01
 * Free for commercial/non-commercial use, Credit Liquidize or the
 * "Anima Framework".
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Anima_PartyHP>
 * @author Liquidize
 *
 * @param X Position
 * @desc Position of the Party HP Window on the X axis.
 * @default Graphics.boxWidth - 200;
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
 * Anima Party Health
 * ============================================================================
 * Changes how the engine works to allow the party to have a single health pool
 * that all party members contribute to. Game over doesn't occur unless this
 * health pool reaches 0. Party members don't die either, they are able to
 * fight until the game party has no hp left.
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
Anima.PartyHP = Anima.PartyHP || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Anima_PartyHP>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find Liquidize's Anima_PartyHP parameters.");
    }
    $.Parameters = parameters[0].parameters;
    $.Param = {};
    $.Param.xPos = String($.Parameters['X Position']);

    //============================================================================
    // Database Manager
    //============================================================================

    //============================================================================
    // Game_Actor
    //============================================================================

    // YEP_SkillCore HP Compatibility
    Game_Actor.prototype.canPaySkillHpCost = function(skill) {
        return this._hp >= this.skillHpCost(skill);
    };

    Game_Actor.prototype.isDying = function() {
        if ($gameParty.mhp && $gameParty.hp) {
            return this.isAlive() && $gameParty.hp < $gameParty.mhp / 4;
        }
        return false;
    };

    Game_Actor.prototype.refresh = function() {
        this.releaseUnequippableItems(false);
        Game_BattlerBase.prototype.refresh.call(this);
    };

    var partyHPGameActor_gainHp = Game_Actor.prototype.gainHp;
    Game_Actor.prototype.gainHp = function(value) {
        partyHPGameActor_gainHp.call(this,value);
        $gameParty.gainPartyHp(value);
    };

    var partyHPGameActor_addState = Game_Actor.prototype.addState;
    Game_Actor.prototype.addState = function(stateId){
        partyHPGameActor_addState.call(this,stateId);
        if ($gameParty) {
            $gameParty.resetPartyHp();
            $gameParty.setupPartyHealth();
        }
    };

    var partyHPGameActor_addBuff = Game_Actor.prototype.addBuff;
    Game_Actor.prototype.addBuff = function(paramId, turns) {
        partyHPGameActor_addBuff.call(this,paramId,turns);
        if ($gameParty) {
            $gameParty.resetPartyHp();
            $gameParty.setupPartyHealth();
        }
    };

    var partyHPGameActor_removeBuff = Game_Actor.prototype.removeBuff;
    Game_Actor.prototype.removeBuff = function(paramId) {
        partyHPGameActor_removeBuff.call(this,paramId);
        if ($gameParty && paramId === 0) {
            $gameParty.resetPartyHp();
            $gameParty.setupPartyHealth();
        }
    };

    var partyHPGameActor_removeState = Game_Actor.prototype.removeState;
    Game_Actor.prototype.removeState = function(stateId) {
        partyHPGameActor_removeState.call(this,stateId);
        if ($gameParty) {
            $gameParty.resetPartyHp();
            $gameParty.setupPartyHealth();
        }
    };


    //============================================================================
    // Game_Party
    //============================================================================

    Object.defineProperty(Game_Party.prototype, 'hp', {
        get: function() {
            return this._partyhealth;
        },
        configurable: true
    });

    Object.defineProperty(Game_Party.prototype, 'mhp', {
        get: function() {
            return this._maxPartyHealth;
        },
        configurable: true
    });

    var partyHPGameParty_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        partyHPGameParty_initialize.call(this);
        this._partyhealth = 0;
        this._maxPartyHealth = 0;
        this.setupPartyHealth();
    };

    var partyHPGameParty_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
    Game_Party.prototype.setupStartingMembers = function() {
        partyHPGameParty_setupStartingMembers.call(this);
        this.resetPartyHp();
        this.setupPartyHealth();
    };

    Game_Party.prototype.resetPartyHp = function(){
        this._partyhealth = 0;
        this._maxPartyHealth = 0;
    };

    var partyHPGameParty_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        partyHPGameParty_addActor.call(this,actorId);
        if (this._actors.contains(actorId)) {
          this.resetPartyHp();
          this.setupPartyHealth();
        }
    };

    var playerHPGameParty_removeActor = Game_Party.prototype.removeActor;
    Game_Party.prototype.removeActor = function(actorId) {
        playerHPGameParty_removeActor.call(this,actorId);
        if (!this._actors.contains(actorId)) {
            this.resetPartyHp();
            this.setupPartyHealth();
        }
    };

    var partyHPGameParty_onBattleStart = Game_Party.prototype.onBattleStart;
    Game_Party.prototype.onBattleStart = function() {
        partyHPGameParty_onBattleStart.call(this);
        this.resetPartyHp();
        this.setupPartyHealth();
    };

    Game_Party.prototype.setupPartyHealth = function(){
      if (this.inBattle()) {
          this.battleMembers().forEach(function(battler) {
             this._partyhealth += battler.hp;
             this._maxPartyHealth += battler.param(0);
          },this);
      } else {
          this.members().forEach(function(member) {
            if (member) {
                this._partyhealth += member.hp;
                this._maxPartyHealth += member.param(0);
            }
          },this);

      }
    };

    Game_Party.prototype.hpRate = function() {
        return this.hp / this.mhp;
    };

    Game_Party.prototype.setPartyHp = function(hp){
        if (this.hp + hp > this.mhp) {
            this._partyhealth = this.mhp;
        } else {
            this._partyhealth = hp;
        }
    };

    Game_Party.prototype.gainPartyHp = function(value){
      this.setPartyHp(this.hp + value);
    };

    Game_Party.prototype.isAllDead = function() {
       return this._partyhealth <= 0;
    };


    //============================================================================
    // Window_BattleStatus
    //============================================================================

    // Overwrite these functions to prevent HP draw.
    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
      //  this.drawActorHp(actor, rect.x + 0, rect.y, 108);
        this.drawActorMp(actor, rect.x + 0, rect.y, 96);
        this.drawActorTp(actor, rect.x + 123, rect.y, 96);
    };

    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
       // this.drawActorHp(actor, rect.x + 0, rect.y, 201);
        this.drawActorMp(actor, rect.x + 0,  rect.y, 114);
    };


    //============================================================================
    // Window_PartyHP
    //============================================================================

    function Window_PartyHp() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyHp.prototype = Object.create(Window_Base.prototype);
    Window_PartyHp.prototype.constructor = Window_PartyHp;

    Window_PartyHp.prototype.initialize = function(x,y,height) {
        var width = 200;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 0;
        this.refresh();
    };

    Window_PartyHp.prototype.drawGauge = function(x, y, height, rate, color1, color2) {
        var fillH = Math.floor(height * rate);
        var gaugeY = y;
        this.contents.fillRect(x, gaugeY, 12, height, this.gaugeBackColor());
        this.contents.gradientFillRect(x, gaugeY, 12, fillH, color1, color2);
    };

    Window_PartyHp.prototype.refresh = function() {
        this.contents.clear();
        if ($gameParty.hpRate()) {
            this.drawGauge(this.width /2 - 6, 64, this.height /2, Math.max(0,$gameParty.hpRate()), this.hpGaugeColor1(), this.hpGaugeColor2());
            this.drawText("HP",0,0,this.width,'center');
            this.drawText(Math.max(0,$gameParty.hp) + "/" + $gameParty.mhp,0,32,this.width,'center');
        }
    };

    Window_PartyHp.prototype.update = function() {
      Window_Base.prototype.update.call(this);
      this.refresh();
    };

    //============================================================================
    // Scene_Battle
    //============================================================================

    var partyHPSceneBattle_createAllWindow = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        partyHPSceneBattle_createAllWindow.call(this);
        this.createPartyHpWindow();
    };

    Scene_Battle.prototype.createPartyHpWindow = function(){
      var x = eval($.Param.xPos);
      var y = this._helpWindow.y + this._helpWindow.height;
      var height = Graphics.height - this._statusWindow.height - y;
      this._partyHpWindow = new Window_PartyHp(x,y,height);
      this.addWindow(this._partyHpWindow);
    };

    var partyHPSceneBattle_refreshStatus = Scene_Battle.prototype.refreshStatus;
    Scene_Battle.prototype.refreshStatus = function() {
        partyHPSceneBattle_refreshStatus.call(this);
        this._partyHpWindow.refresh();
    };

})(Anima.PartyHP);

PartyHP = Anima.PartyHP;
Imported["Anima_PartyHP"] = 1.01;