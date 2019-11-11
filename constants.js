"use strict"
const constants = {

  /* Harvester Creeps */
  BASIC_HARVESTER: 1000,
  STUDENT_HARVESTER: 1001,
  INTERN_HARVESTER: 1002,
  JUNIOR_HARVESTER: 1003,

  /* Upgrader Creeps */
  BASIC_UPGRADER: 2000,
  STUDENT_UPGRADER: 2001,
  INTERN_UPGRADER: 2002,
  JUNIOR_UPGRADER: 2003,

  /* Builders Creep */
  BASIC_BUILDER: 3000,
  STUDENT_BUILDER: 3001,
  INTERN_BUILDER: 3002,
  JUNIOR_BUILDER: 3003,

  /* Upkeepers Creep */
  BASIC_UPKEEP: 4000,
  STUDENT_UPKEEP: 4001,
  INTERN_UPKEEP: 4002,
  JUNIOR_UPKEEP: 4003,

  /* Defenders Creep */
  BASIC_DEFENDER: 5000,
  PRIVATE_DEFENDER: 5001,
  ORPORAL_DEFENDER: 5002,
  MASTER_CORPORAL_DEFENDER: 5003,
  SERGEANT_DEFENDER: 5004,
  WARRANT_OFFICER_DEFENDER: 5005,
  MASTER_WARRANT_OFFICER_DEFENDER:5006,
  CHIEF_WARRANT_OFFICER_DEFENDER: 5007,
  OFFICER_CADET_DEFENDER:5008,
  SECOND_LIEUTENANT_DEFENDER: 5009,
  LIEUTENANT_DEFENDER: 5010,
  CAPTAIN_DEFENDER:5011,
  MAJOR_DEFENDER: 5012,
  LIEUTENANT_COLONEL_DEFENDER: 5013,
  COLONEL_DEFENFER:5014,
  BRIGADIER_GENERAL_DEFENDER: 5015,
  MAJOR_GENERAL_DEFENDER: 5016,
  LIEUTENANT_GENERAL_DEFENDER: 5017,
  GENERAL_DEFENDER: 5018,

  // Haulers
  GRUNT_HAULER: 6000,

  // Room Energy Theresolds
  ROOM_LEVEL_3: 800


};

Object.freeze(constants);
module.exports = constants;
