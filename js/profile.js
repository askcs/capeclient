/**
 * Installation profile
 */
var profile = {

  meta: 'cape',

  title: 'CapeClient',

  states: [
    'com.ask-cs.State.Available',
    'com.ask-cs.State.KNRM.BeschikbaarNoord',
    'com.ask-cs.State.KNRM.BeschikbaarZuid',
    'com.ask-cs.State.Unavailable',
    'com.ask-cs.State.KNRM.SchipperVanDienst',
    'com.ask-cs.State.Unreached'
  ],

  divisions: [
    {
      id: 'all',
      label: 'All divisions'
    }, 
    {
      id: 'knrm.StateGroup.BeschikbaarNoord',
      label: 'Noord'
    }, 
    {
      id: 'knrm.StateGroup.BeschikbaarZuid',
      label: 'Zuid'
    }
  ],

  roles: [
    {
      id: 1,
      label: 'Planner'
    }, 
    {
      id: 2,
      label: 'Schipper'
    }, 
    {
      id: 3,
      label: 'Opstapper'
    }
  ]
};






