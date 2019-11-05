var roleUpkeep = require('role.upkeep');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawner = require('role.spawner');
var roleDefender = require('role.defender');
module.exports.loop = () => {
    // vital
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Disposing the deceased ones - name: ' + name);
        }
    }

    for (var name in Game.rooms) {
        console.log(name);
    }
    roleSpawner.run(Game.spawns['Spawn1']);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];



        if(creep.memory.role == 'harvester') {
          // roleUpkeep.run(creep);

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
    }
}
