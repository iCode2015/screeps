/*******************************************************************************
* Description: A role object whom's responsible for keeping stuff in shape.
* Date Created: 11/3/2019
* Author: Riley aka CofffeeAddict
*******************************************************************************/
module.exports = {
  run: function(creep) {
    // First check if have free capacity (source). If so, do harvest stuff.
    // Otherwise repair stuff.
    if (creep.store.getFreeCapacity() > 5) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {

          creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      const walls = this.findWalls(creep);
      if (walls.length) {
        if (creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
          creep.say("🛠");
          creep.moveTo(walls[0]);
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
  findWalls: (creep) => {
    // let walls = "bob";
    let walls = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax;
      }
    });
    return walls;
  }
}
