module.exports = {

  /*
  Description: Tower AI. Defend my base.
  Author: Riley aka CofffeeAddict
  Date Created: 11/7/2019
  */

  /*
  Attack any hostile creeps that comes in range.
  Attack the closest one first, because it is most effective.
  */

  /**
  The function that will be called in looping structure.
  @param {StructureTower} tower the tower that will be used.
  **/
  run: function(tower) {
    // self.testFunc();
    this.attackTarget(tower);

    // this.testFunc();

  },

  /**
  Find a target that is closest to the tower.
  @param {StructureTower} tower the tower to be used.
  **/
  getNearestHostileTarget: (tower) => {
    let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    return target;
  },

  /**
  @param {StructureTower} tower the tower to be used.
  **/
  attackTarget: function(tower) {
    let target = this.getNearestHostileTarget(tower);
    if (target) {
      tower.attack(target);
    }
  }
};
