const roleUpkeep = require('role.upkeep');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleSpawner = require('role.spawner');
const roleDefender = require('role.defender');
const roleHauler = require('role.hauler');
const towerAttacker = require('tower.attacker');

const constants = require('constants');


module.exports.loop = function() {
//Game.rooms['sim'].memory



    // console.log(constants.GENERAL_DEFENDER);
    // vital
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Disposing the deceased ones - name: ' + name);
        }
    }

    for (var name in Game.rooms) {
      // Goal is: Find all soruces containing sources.
      if (!Game.rooms[name].memory.sourceIDs) {
        // console.log('should not execute if already exists');
        let sources = Game.rooms[name].find(FIND_SOURCES);
        // console.log(sources);
        // Game.rooms[name].memory.sources = sources;
        let listOfSources = [];
        for (let source in sources) {
          listOfSources.push(sources[source].id);
        }
        console.log(listOfSources);
        Game.rooms[name].memory.sourceIDs = listOfSources;
      }
        console.log(name);
        roleSpawner.run(Game.spawns['Spawn1'], Game.rooms[name]);

    }
    // roleSpawner.run(Game.spawns['Spawn1'], Game.rooms['sim']);

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];


        if (!creep.spawning) {
          if(creep.memory.role == 'harvester') {

              roleHarvester.run(creep);
          }
          if(creep.memory.role == 'upgrader') {
              roleUpgrader.run(creep);
              if (creep.memory.upgrading == null) {
                creep.memory.upgrading = true;
              }

          }

          if(creep.memory.role == 'builder') {
              roleBuilder.run(creep);
              if (creep.memory.building == null) {
                console.log('setting building');
                creep.memory.building = true;
              }
          }

          if (creep.memory.role == 'defender') {
              roleDefender.run(creep);
          }

          if (creep.memory.role == 'upkeep') {
            roleUpkeep.run(creep);

          }

          if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
          }
      }
    }

    for (let struct in Game.structures) {
      if (Game.structures[struct].structureType == STRUCTURE_TOWER) {
        let tower = Game.structures[struct];
        towerAttacker.run(tower);
      }
    }
}
