const c = require('constants');

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
    DUMMY_LIMIT: 1,
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
        // this.setLimit('harvester', 5);
        // console.log(this.DUMMY_LIMIT);
        // Tests
        // this.spawnHarvesterCreep(c.BASIC_HARVESTER);

        // Get basic tally of types of creeps
        this.harvesters = this.getTotalHarvesters(room);
        this.upgraders = this.getTotalUpgraders(room);
        this.builders = this.getTotalBuilders(room);
        this.defenders = this.getTotalDefenders(room);
        this.upkeeps = this.getTotalUpkeeps(room);
        console.log('Defenders: ' + this.defenders + ',  ' + 'Harvesters: ' + this.harvesters + ', Upgraders: ' + this.upgraders + ', Builders: ' + this.builders + ', Upkeepers: ' + this.upkeeps);


        // If certain type of creep is less than certain value, spawn appropirate creep.
        if (this.harvesters < this.HARVESTERS_LIMIT && room.energyAvailable > 500) {
          this.spawnHarvesterCreep(c.STUDENT_HARVESTER, spawn);
        } else if (this.harvesters < (this.HARVESTERS_LIMIT / 2) ) {
          this.spawnHarvesterCreep(c.BASIC_HARVESTER, spawn);
        } else if (this.defenders < this.DEFENDERS_LIMIT) {
            this.spawnDefenderCreep(c.BASIC_DEFENDER, spawn);
        } else if (this.upgraders < this.UPGRADERS_LIMIT && room.energyAvailable > 400) {
          this.spawnUpgraderCreep(c.STUDENT_UPGRADER, spawn);
        } else if (this.upgraders == 0) {
          this.spawnUpgraderCreep(c.BASIC_UPGRADER, spawn);
        } else if (this.builders < this.BUILDERS_LIMIT && room.energyAvailable > 400) {
          this.spawnBuilderCreep(c.STUDENT_BUILDER, spawn);
        } else if (this.builders == 0) {
            this.spawnBuilderCreep(c.BASIC_BUILDER, spawn);
        } else if (this.upkeeps < this.UPKEEPS_LIMIT && room.energyAvailable > 400) {
            this.spawnUpkeepCreep(c.STUDENT_UPKEEP, spawn);
        } else if (this.upkeeps == 0) {
          this.spawnUpkeepCreep(c.BASIC_UPKEEP, spawn);
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
    },


    /**
    Sets the amount of creeps to a specific role can be spawned.
    @param {String} limit the variable to be changed. (should be referring to this object's variables)
    @param {Number} amount the amount to be set.
    **/
    setLimit: function(limit, amount) {
      switch (limit) {
        case 'harvester':
          this.HARVESTERS_LIMIT = amount;
          break;
        case 'upgrader':
          this.UPGRADERS_LIMIT = amount;
          break;
        case 'upkeep':
          this.UPKEEPS_LIMIT = amount;
          break;
        case 'defender':
          this.DEFENDERS_LIMIT = amount;
          break;
        case 'builder':
          this.BUILDERS_LIMIT = amount;
          break;
        case 'dummy':
          this.DUMMY_LIMIT = amount;
          break;
        default:
          console.log("Tried to set something in the void");
      }
    },

    /**
    Spawns the harvester creep depending on rank (*_HARVESTER constant)
    @param {Number} rank one of *_HARVESTER constant
    @param {StructureSpawn} spawn the spawn to be used for spawning
    **/
    spawnHarvesterCreep: (rank, spawn) => {
      // Had to use if statements. Case switches is not scoped..........
      if (rank == c.BASIC_HARVESTER) {
        let newName = Game.time + '-H';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      } else if (rank == c.STUDENT_HARVESTER) {
        let newName = Game.time + '-H+';
        spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      } else if (rank == c.INTERN_HARVESTER) {
        let newName = 'Intern Harvester #' + Game.time;
        spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      }
    },

    /**
    Spawns upgrader creeps depending on rank given
    @param {Number} rank one of *_UPGRADER constant
    @param {StructureSpawn} spawn to be used for spawning
    **/
    spawnUpgraderCreep: (rank, spawn) => {
      if (rank == c.BASIC_UPGRADER) {
        let newName = Game.time + '-U';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
      } else if (rank == c.STUDENT_UPGRADER) {
          let newName = Game.time + '-U+';
          // 200 + 100 + 100 = 400
          // costs 400 energy
          spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
      } else if (rank == c.INTERN_UPGRADER) {
        let newName = 'Intern Upgrader #' + Game.time;
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
      }
    },

    /**
    Spawns builder creeps depending on rank given
    @param {Number} rank one of *_BUILDER constant
    @param {StructureSpawn} spawn used to spawn the creep
    **/
    spawnBuilderCreep: (rank, spawn) => {
      if (rank == c.BASIC_BUILDER) {
        let newName = Game.time + '-B';
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
      } else if (rank == c.STUDENT_BUILDER) {
        let newName = Game.time + '-B+';
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
      } else if (rank == c.INTERN_BUILDER) {
        let newName = 'Intern Builder #' + Game.time;
        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}} );

      }
    },

    spawnUpkeepCreep: (rank, spawn) => {
      if (rank == c.BASIC_UPKEEP) {
        let newName = Game.time + '-UPK';
        spawn.spawnCreep([CARRY, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
      } else if (rank == c.STUDENT_UPKEEP) {
        let newName = Game.time + '-UPK+';
        spawn.spawnCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
      }
    },

    spawnDefenderCreep: (rank, spawn) => {
      if (rank == c.BASIC_DEFENDER) {
        let newName = Game.time + '-D';
        spawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], newName, {memory: {role: 'defender'}} );
      } else if (rank == c.PRIVATE_DEFENDER) {
        let newName = 'Private Defender #' + Game.time;
        spawn.spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], newName, {memory: {role: 'defender'}} );
      }
    }

};
