var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
            creep.memory.sourceID = this.findSource(creep);
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}, {reusePath: 15});
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
        else {
            let source = Game.getObjectById(creep.memory.sourceID);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source,
                  {visualizePathStyle: {stroke: '#ffaa00'}
                  });
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
          source.pos.y - 3,
          source.pos.x - 3,
          source.pos.y + 3,
          source.pos.x + 3,
          true
        );
        console.log(crowd.length);
        if (crowd.length < 2) {
          break;
        }
      }
      return source.id;
    }
};

module.exports = roleBuilder;
