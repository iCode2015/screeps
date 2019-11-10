/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.defender');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    // Basic defender. If find hostile, attack head on. Nothing else
    run: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);

        if (targets.length) {
            if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                console.log('moved to attack a target');
            }
        } else {
            var spawner = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN)
                    }
                });
                creep.moveTo(spawner[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

};
