var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // creep.say('test');
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {

                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {

                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
              let idleFlag = creep.room.find(FIND_FLAGS, {
                filter: (flag) => {
                  return flag.name == 'Idle';
                }
              });

              if (idleFlag.length) {
                creep.moveTo(idleFlag[0]);
              }
            }
        }
	},

  isPathBlocked: (creep) => {
    let creepsNearby = creep.room.lookForAtArea(LOOK_CREEPS, 10, 10, 10, 10, true);
    for (let i = 0; i < creepsNearby.length; i++) {
      console.log(creepsNearby[i].creep);
    }
  }
};

module.exports = roleHarvester;
