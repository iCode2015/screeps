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

    // Vairables
    harvesters: 0,
    upgraders: 0,
    builders: 0,
    defenders: 0,
    upkeepers: 0,
    haulers: 0,
    /**
     * @param (Game.spawns[]) spawn
     * @param {Room} room
    **/
    run: function(spawn, room) {
      let HARVESTERS_LIMIT;
      let BUILDERS_LIMIT = 2;
      let UPGRADERS_LIMIT;
      let DEFENDERS_LIMIT = 2;
      let UPKEEPS_LIMIT = 1;
      let HAULERS_LIMIT = 0;
      // let DUMMY_LIMIT;

      // Energy Capacity for specific rooms
      const roomEnergyCap = room.energyCapacityAvailable;


      // Logic for setting limits. If specific room have certain theresold of
      // energy/capacity, etc.

      // For harvesters
      if (roomEnergyCap >= c.ROOM_LEVEL_3) {
        HARVESTERS_LIMIT = 2;
        // Reasoning: If creeps have better body parts, it means the controller will be taking longer to upgrade.
        UPGRADERS_LIMIT = 3;
        HAULERS_LIMIT = 1;
      } else {
        HARVESTERS_LIMIT = 3;
        UPGRADERS_LIMIT = 2;
      }


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
        this.haulers = this.getTotalHaulers(room);
        console.log('Defenders: ' + this.defenders + ',  ' + 'Harvesters: ' + this.harvesters + ', Upgraders: ' + this.upgraders + ', Builders: ' + this.builders + ', Upkeepers: ' + this.upkeeps + ', Haulers: ' + this.haulers);

        console.log('LIMIT SET: Defenders: ' + DEFENDERS_LIMIT + ', Harvesters: ' + HARVESTERS_LIMIT + ', Upgraders: ' + UPGRADERS_LIMIT + ', Builders: ' + BUILDERS_LIMIT + ', Upkeeps: ' + UPKEEPS_LIMIT + ', Haulers: ' + HAULERS_LIMIT);
        // If certain type of creep is less than certain value, spawn appropirate creep.
        if (this.harvesters < HARVESTERS_LIMIT && this.spawnHarvesterCreep(c.JUNIOR_HARVESTER, spawn) != ERR_NOT_ENOUGH_ENERGY) {
          HARVESTERS_LIMIT = 2;
        }
        else if (this.harvesters < HARVESTERS_LIMIT && this.spawnHarvesterCreep(c.INTERN_HARVESTER, spawn) != ERR_NOT_ENOUGH_ENERGY) {
          HARVESTERS_LIMIT = 2;
        } else if (this.harvesters < HARVESTERS_LIMIT && this.spawnHarvesterCreep(c.STUDENT_HARVESTER, spawn) != ERR_NOT_ENOUGH_ENERGY) {
          HARVESTERS_LIMIT = 3;
        } else if (this.harvesters < (HARVESTERS_LIMIT / 2) && this.spawnHarvesterCreep(c.BASIC_HARVESTER, spawn) != ERR_NOT_ENOUGH_ENERGY) {
          HARVESTERS_LIMIT = 3;
        } else if (this.defenders < DEFENDERS_LIMIT && this.spawnDefenderCreep(c.PRIVATE_DEFENDER, spawn) != ERR_NOT_ENOUGH_ENERGY) {

        } else if (this.defenders == 0 && this.spawnDefenderCreep(c.BASIC_DEFENDER, spawn)  != ERR_NOT_ENOUGH_ENERGY) {

        } else if (this.upgraders < UPGRADERS_LIMIT && this.spawnUpgraderCreep(c.STUDENT_UPGRADER, spawn) != ERR_NOT_ENOUGH_ENERGY) {

        } else if (this.upgraders == 0) {
          this.spawnUpgraderCreep(c.BASIC_UPGRADER, spawn);
        } else if (this.builders < BUILDERS_LIMIT && this.spawnBuilderCreep(c.STUDENT_BUILDER, spawn) != ERR_NOT_ENOUGH_ENERGY) {

        } else if (this.builders == 0) {
            this.spawnBuilderCreep(c.BASIC_BUILDER, spawn);
        } else if (this.haulers < HAULERS_LIMIT && this.spawnHaulerCreep(c.GRUNT_HAULER, spawn) != ERR_NOT_ENOUGH_ENERGY) {

        } else if (this.upkeeps < UPKEEPS_LIMIT && this.spawnUpkeepCreep(c.STUDENT_UPKEEP, spawn) != ERR_NOT_ENOUGH_ENERGY) {

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


    getTotalHaulers: function(room) {
       return _.filter(Game.creeps, (creep) =>
         creep.memory.role == 'hauler' && creep.room.name == room.name
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
    Spawns the harvester creep depending on rank (*_HARVESTER constant)
    @param {Number} rank one of *_HARVESTER constant
    @param {StructureSpawn} spawn the spawn to be used for spawning
    **/
    spawnHarvesterCreep: (rank, spawn) => {
      // Had to use if statements. Case switches is not scoped..........
      if (rank == c.BASIC_HARVESTER) {
        let newName = Game.time + '-H';
        return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      } else if (rank == c.STUDENT_HARVESTER) {
        let newName = Game.time + '-H+';
        return spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      } else if (rank == c.INTERN_HARVESTER) {
        let newName = 'Intern Harvester #' + Game.time;
        return spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
      } else if (rank == c.JUNIOR_HARVESTER) {
        let newName = 'Junior Harvester #' + Game.time;
        return spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}} );
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
        return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
      } else if (rank == c.STUDENT_UPGRADER) {
          let newName = Game.time + '-U+';
          // 200 + 100 + 100 = 400
          // costs 400 energy
          return spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
      } else if (rank == c.INTERN_UPGRADER) {
        let newName = 'Intern Upgrader #' + Game.time;
        return spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}} );
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
        return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
      } else if (rank == c.STUDENT_BUILDER) {
        let newName = Game.time + '-B+';
        return spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}} );
      } else if (rank == c.INTERN_BUILDER) {
        let newName = 'Intern Builder #' + Game.time;
        return spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}} );

      }
    },

    spawnUpkeepCreep: (rank, spawn) => {
      if (rank == c.BASIC_UPKEEP) {
        let newName = Game.time + '-UPK';
        return spawn.spawnCreep([CARRY, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
      } else if (rank == c.STUDENT_UPKEEP) {
        let newName = Game.time + '-UPK+';
        return spawn.spawnCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], newName, {memory: {role: 'upkeep'}} );
      }
    },

    spawnDefenderCreep: (rank, spawn) => {
      if (rank == c.BASIC_DEFENDER) {
        let newName = Game.time + '-D';
        return spawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], newName, {memory: {role: 'defender'}} );
      } else if (rank == c.PRIVATE_DEFENDER) {
        let newName = 'Private Defender #' + Game.time;
        return spawn.spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], newName, {memory: {role: 'defender'}} );
      }
    },

    spawnHaulerCreep(rank, spawn) {
      if (rank == c.GRUNT_HAULER) {
        let newName = 'Grunt Hauler #' + Game.time;
        return spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                          newName, {memory: {role: 'hauler'}});
      }
    }

};
