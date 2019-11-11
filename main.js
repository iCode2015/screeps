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
    // console.log(constants.GENERAL_DEFENDER);
    // vital
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Disposing the deceased ones - name: ' + name);
        }
    }

    for (var name in Game.rooms) {
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
          }

          if(creep.memory.role == 'builder') {
              roleBuilder.run(creep);
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
