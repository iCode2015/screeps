/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.spawner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    // constants
    HARVESTERS_LIMIT: 2,
    BUILDERS_LIMIT: 1,
    UPGRADERS_LIMIT: 1,
    DEFENDERS_LIMIT: 1,
    UPKEEPS_LIMIT: 1,
    // Vairables
    harvesters: 0,
    upgraders: 0,
    builders: 0,
    defenders: 0,
    upkeepers: 0,
    /**
     * @param (Game.spawns[]) spawn
    **/
    run: function(spawn) {
        // Get basic tally of types of creeps
        this.harvesters = this.getTotalHarvesters();
        this.upgraders = this.getTotalUpgraders();
        this.builders = this.getTotalBuilders();
        this.defenders = this.getTotalDefenders();
        this.upkeeps = this.getTotalUpkeeps();
        console.log('Defenders: ' + this.defenders + ',  ' + 'Harvesters: ' + this.harvesters + ', Upgraders: ' + this.upgraders + ', Builders: ' + this.builders + ', Upkeepers: ' + this.upkeeps);


        // If certain type of creep is less than certain value, spawn appropirate creep.
        if (this.harvesters < this.HARVESTERS_LIMIT) {
          if (Game.rooms['W41S24'].availableEnergy > (Game.rooms['W41S24'].availableCapacityAvailable * .8) ) {
            this.spawnHarvesterCreep();
          } else {
            this.spawnBasicHarvesterCreep();

          }
        } else if (this.defenders < this.DEFENDERS_LIMIT) {
            this.spawnBasicDefenderCreep();
            // Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], Game.time + '-H', {memory: {role: 'harvester'} });
        } else if (this.upgraders < this.UPGRADERS_LIMIT) {
          if (Game.rooms['W41S24'].availableEnergy > (Game.rooms['W41S24'].availableCapacityAvailable * .8) ) {
            console.log("spawning U+ upgrader!");
            this.spawnUpgraderCreep();
          } else {
            this.spawnBasicUpgraderCreep();
          }
        } else if (this.builders < this.BUILDERS_LIMIT) {
            this.spawnBasicBuilderCreep();
        } else if(this.upkeeps < this.UPKEEPS_LIMIT) {
          this.spawnBasicUpkeepCreep();
        }




    },

    getTotalHarvesters: function() {
       return  _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    },

    getTotalUpgraders: function() {
       return  _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;

    },

    getTotalBuilders: function() {
       return _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    },

    getTotalDefenders: function() {
       return _.filter(Game.creeps, (creep) => creep.memory.role == 'defender').length;
    },

    getTotalUpkeeps: function() {
       return _.filter(Game.creeps, (creep) => creep.memory.role == 'upkeep').length;
    },

    spawnBasicHarvesterCreep: function() {
        var newName = Game.time + '-H';
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}} );

    },

    spawnHarvesterCreep: function() {
        var newName = Game.time + '-H+';
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );

    },

    spawnBasicUpgraderCreep: function() {
        var newName = Game.time + '-U';
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );

    },

    spawnUpgraderCreep: function() {
        var newName = Game.time + '-U+';
        // 200 + 100 + 100 = 400
        // costs 400 energy
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );

    },

    spawnBasicBuilderCreep: function() {
        var newName = Game.time + '-B';
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}} );

    },

    spawnBasicDefenderCreep: function() {
        var newName = Game.time + '-D';
        Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, MOVE], newName, {memory: {role: 'defender'}} );

    },

    spawnBasicUpkeepCreep: function() {
        var newName = Game.time + '-UPK';
        Game.spawns['Spawn1'].spawnCreep([CARRY, WORK, MOVE], newName, {memory: {role: 'upkeep'}} );

    }

};
