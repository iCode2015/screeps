var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}}, {reusePath: 15});
            }
        }
        else {
            let source = this.findSource(creep);

            // Now we have source to target
            // console.log(source);

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source, {visualizePathStyle: {}});
            }
        }
	},

  findSource: (creep) => {
    // a copy from this room's memory.
    const sourceIDs = creep.room.memory.sourceIDs;
    const sourcesUnSortd = [];
    const sourcesSorted = [];

    // We first need to
    for (let i in sourceIDs) {
      sourcesUnSortd.push((Game.getObjectById(sourceIDs[i])))
    }

    // console.log(sourcesUnSortd);

    // Now sort energy sources
    for (let i in sourceIDs) {
      sourcesSorted.push(creep.pos.findClosestByRange(sourcesUnSortd));
      sourcesUnSortd.shift();
    }
    // console.log(sourcesSorted);

    // Now with sorted list, we can determine closest source that has
    // less than 2 creeps crowding.
    let source;
    for (let i in sourcesSorted) {
      source = sourcesSorted[i];
      // console.log(source);
      let crowd = creep.room.lookForAtArea(LOOK_CREEPS,
        source.pos.y - 5,
        source.pos.x - 5,
        source.pos.y + 5,
        source.pos.x + 5,
        true
      );
      // console.log(crowd);

    }
    return source;
  }
};

module.exports = roleUpgrader;
