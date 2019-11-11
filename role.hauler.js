const c = require('constants');

module.exports = {
  /*
  Description:
    Hauler role. Main role is to haul energy from container to towers.
    Secondary role: haul it to extensions/spawns.
  */

  run: function(creep) {
    // Boolean flags to determine if it should be draining from storage/containers
    // If withdrawl is true, well... withdrawl from containers/storages.
    // Otherwise transfer to towers if empty, then if spawner/extensions have free capacity, transfer it.


    if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.withdrawl) {
      creep.say('🌾');
      creep.memory.withdrawl = true;
    }

    if (creep.store.getFreeCapacity() == 0 && creep.memory.withdrawl) {
      creep.memory.withdrawl = false;
    }

    // Now, actions based on if withdrawl is true or not.
    if (creep.memory.withdrawl) {
      // console.log("draining branch");
      this.drain(creep);
    } else {
      this.dump(creep);
    }


  },

  /**
  Find nearest target, withdrawl (moves nearer if too far)
  @param {Creep} creep that will be used
  **/
  drain: (creep) => {
    let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (struct) => {
        return (struct.structureType == STRUCTURE_CONTAINER || struct.structureType == STRUCTURE_STORAGE)
                && struct.store[RESOURCE_ENERGY] > 0;
      }
    });
    // console.log(target);
    if (target) {
      if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
          visualizePathStyle: {
            fill: 'transparent',
            stroke: '#9BF706',
            lineStyle: 'dashed',
            strokeWidth: .15,
            opacity: .1
          }
        });
      }
    }
  },

  dump: (creep) => {
    // target towers first. If nothing is found (ie. full), then look at spawner/extensions
    let tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (struct) => {
        return struct.structureType == STRUCTURE_TOWER && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });

    // Check if exists
    if (tower) {
      if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower, {
        visualizePathStyle: {
            fill: 'transparent',
            stroke: '#9BF706',
            lineStyle: 'dashed',
            strokeWidth: .15,
            opacity: .1
          }
        });
      }
    } else {
      let other = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (struct) => {
          return (struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_EXTENSION)
                  && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });

      if (other) {
        if(creep.transfer(other, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(other, {
            visualizePathStyle: {
              fill: 'transparent',
              stroke: '#9BF706',
              lineStyle: 'dashed',
              strokeWidth: .15,
              opacity: .1
            }
          });
        }
      } else {
        // Go to idle flag to get out of way
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


  }



};
