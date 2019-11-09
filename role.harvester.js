var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // Boolean flag - creep.memory.harvesting

      /**
      If harvester's cargo is EMPTY, it is time to harvest.
      If harvest's cargo is FULL, it is time to transfer.

      So, if cargo is empty AND harvesting is false, THEN switch harvesting to true.
      if cargo is FULL and harvesting is true, switch harvesting to false.
      **/
      if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.harvesting) {
        creep.memory.harvesting = true;
      }
      if (creep.store.getFreeCapacity() == 0 && creep.memory.harvesting) {
        creep.memory.harvesting = false;
      }


      // creep.say('test');
	    if(creep.memory.harvesting) {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });

            // Container target
            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: (container) => {
                return container.structureType == STRUCTURE_CONTAINER && container.store.getFreeCapacity() > 0;
              }
            });
            if(target) {

                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (container) {
              console.log("test transfeering");
              if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
              }


            } else {

              // Other than main duties, harvesters should fill in the containers.
              // Only if it is not full.

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
