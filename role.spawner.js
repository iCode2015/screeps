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
    HARVESTERS_LIMIT: 3,
    BUILDERS_LIMIT: 2,
    UPGRADERS_LIMIT: 2,
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
     * @param {Room} room
    **/
    run: function(spawn, room) {
        // Tests
        // console.log(this.calculateBodyPartsCost([WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY]));

        // Get basic tally of types of creeps
        this.harvesters = this.getTotalHarvesters(room);
        this.upgraders = this.getTotalUpgraders(room);
        this.builders = this.getTotalBuilders(room);
        this.defenders = this.getTotalDefenders(room);
        this.upkeeps = this.getTotalUpkeeps(room);
        console.log('Defenders: ' + this.defenders + ',  ' + 'Harvesters: ' + this.harvesters + ', Upgraders: ' + this.upgraders + ', Builders: ' + this.builders + ', Upkeepers: ' + this.upkeeps);


        // If certain type of creep is less than certain value, spawn appropirate creep.
        if (this.harvesters < this.HARVESTERS_LIMIT && room.energyAvailable > 500) {
          this.spawnHarvesterCreep(spawn);
        } else if (this.harvesters < (this.HARVESTERS_LIMIT / 2) ) {
          this.spawnBasicHarvesterCreep(spawn);
        } else if (this.defenders < this.DEFENDERS_LIMIT) {
            this.spawnBasicDefenderCreep(spawn);
            // Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], Game.time + '-H', {memory: {role: 'harvester'} });
        } else if (this.upgraders < this.UPGRADERS_LIMIT && room.energyAvailable > 400) {
          this.spawnUpgraderCreep(spawn);
        } else if (this.upgraders == 0) {
          this.spawnBasicUpgraderCreep(spawn);
        } else if (this.builders < this.BUILDERS_LIMIT && room.energyAvailable > 400) {
          this.spawnBuilderCreep(spawn);
        } else if (this.builders == 0) {
            this.spawnBasicBuilderCreep(spawn);
        } else if (this.upkeeps < this.UPKEEPS_LIMIT && room.energyAvailable > 400) {
            this.spawnUpkeepCreep(spawn);
        } else if (this.upkeeps == 0) {
          this.spawnBasicUpkeepCreep(spawn);
        }




    },

    getTotalHarvesters: function(room) {
       return  _.filter(Game.creeps,
         (creep) => creep.memory.role == 'harvester'
       && creep.room.name == room.name).length;
    },

    getTotalUpgraders: function(room) {
       return  _.filter(Game.creeps, (creep) =>
         creep.memory.role == 'upgrader' && creep.room.name == room.name
       ).length;
    },

    getTotalBuilders: function(room) {
       return _.filter(Game.creeps, (creep) =>
         creep.memory.role == 'builder' && creep.room.name == room.name
       ).length;
    },

    getTotalDefenders: function(room) {
       return _.filter(Game.creeps, (creep) =>
         creep.memory.role == 'defender' && creep.room.name == room.name
       ).length;
    },

    getTotalUpkeeps: function(room) {
       return _.filter(Game.creeps, (creep) =>
         creep.memory.role == 'upkeep' && creep.room.name == room.name
       ).length;
    },

    spawnBasicHarvesterCreep: function(spawn) {
        let newName = Game.time + '-H';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );

    },

    spawnHarvesterCreep: function(spawn) {
        let newName = Game.time + '-H+';
        spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );

    },

    spawnBasicUpgraderCreep: function(spawn) {
        let newName = Game.time + '-U';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );

    },

    spawnUpgraderCreep: function(spawn) {
        let newName = Game.time + '-U+';
        // 200 + 100 + 100 = 400
        // costs 400 energy
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );

    },

    spawnBasicBuilderCreep: function(spawn) {
        let newName = Game.time + '-B';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
    },

    spawnBuilderCreep: function(spawn) {
        let newName = Game.time + '-B+';
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
    },

    spawnBasicDefenderCreep: function(spawn) {
        let newName = Game.time + '-D';
        spawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], newName, {memory: {role: 'defender'}} );

    },

    spawnBasicUpkeepCreep: function(spawn) {
        let newName = Game.time + '-UPK';
        spawn.spawnCreep([CARRY, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
    },

    spawnUpkeepCreep: function(spawn) {
        let newName = Game.time + '-UPK+';
        spawn.spawnCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
    },

    /**
    Calculates the cost for given array of body parts (constants).
    @param {Array} bodyParts array of body body parts
    @return {Number} the total cost of producing said body
    **/
    calculateBodyPartsCost: (bodyParts) => {
      let cost = 0;

      for (let item in bodyParts) {
        cost += BODYPART_COST[bodyParts[item]];
      }

      return cost;
    }

};
