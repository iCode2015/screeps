/*******************************************************************************
* Description: A role object whom's responsible for keeping stuff in shape.
* Date Created: 11/3/2019
* Author: Riley aka CofffeeAddict
*******************************************************************************/
module.exports = {
  run: function(creep) {
    // First check if have free capacity (source). If so, do harvest stuff.
    // Otherwise repair stuff.

    // Need to set boolean flags (is that term correct?)
    // If NO stored energy left, it means it is time to harvest.
    // If still have some, keep repairing.
    if (creep.store[RESOURCE_ENERGY] == 0 && creep.memory.repairing) {
      creep.memory.repairing = false;
    }
    else if (creep.store.getFreeCapacity() == 0 && !creep.memory.repairing) {
      creep.memory.repairing = true;
    }

    if (!creep.memory.repairing) {
      creep.say("🌾");

      // console.log("Have some free capacity left...");
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          // creep.say("harvest");
          creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      creep.say("🛠");
      const items = this.findItems(creep);
      if (items.length) {
        if (creep.repair(items[0]) == ERR_NOT_IN_RANGE) {
          creep.say("🛠");
          creep.moveTo(items[0]);
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

  /**
    The goal is to return array of walls that needs to be fixed.
    Logically, once wall is fixed, array should be less than before, hence
    we can use first item in the list.
    In future, I can refine it to find nearest ones.
    @param {Creep} creep the creep that we will use
  **/
  findItems: (creep) => {
    // let walls = "bob";
    let walls = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax;
      }
    });
    return walls;
  }
}
