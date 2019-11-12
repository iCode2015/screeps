var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
            creep.memory.sourceID = this.findSource(creep);
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
          // crep.memory.sourceTarget = null;
	        creep.say('⚡ upgrade');
	    }


	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {

            // Now we have source to target
            // console.log(source);
            // console.log(creep.memory.sourceID);
            let sourceTarget = Game.getObjectById(creep.memory.sourceID);
            if (creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sourceTarget, {visualizePathStyle: {}});
            }
        }
	},

  findSource: (creep) => {
    // a copy from this room's memory.
    const sourceIDs = creep.room.memory.sourceIDs;
    let sourcesUnSortd = [];
    const sourcesSorted = [];

    // We first need to
    for (let i in sourceIDs) {
      sourcesUnSortd.push((Game.getObjectById(sourceIDs[i])))
    }

    console.log(sourcesUnSortd);

    // Now sort energy sources
    for (let i in sourceIDs) {
      let foundCloest = creep.pos.findClosestByRange(sourcesUnSortd);
      sourcesSorted.push(foundCloest);

      // console.log(toBeRemovedIndex);
      sourcesUnSortd = sourcesUnSortd.filter((value, index, sourcesUnSortd) => {
        return value != foundCloest;
      });
    }
    console.log(sourcesSorted);

    // Now with sorted list, we can determine closest source that has
    // less than 2 creeps crowding.
    let source;
    for (let i in sourcesSorted) {
      source = sourcesSorted[i];
      // console.log(source);
      let crowd = creep.room.lookForAtArea(LOOK_CREEPS,
        source.pos.y - 4,
        source.pos.x - 4,
        source.pos.y + 4,
        source.pos.x + 4,
        true
      );
      if (crowd.length < 2) {
        break;
      }
    }
    return source.id;
  }
};

module.exports = roleUpgrader;
