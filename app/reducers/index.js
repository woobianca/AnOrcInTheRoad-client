import { combineReducers } from 'redux';
import { quests, updateQuests, toggleQuest, questFilter } from './quests';
import user from './user';
import { updateParty, createInvite } from './party';
import { location, addWatcher } from './location';

const App = combineReducers({
  quests: updateQuests,
  user: user,
  location: location,
  watcherSub: addWatcher,
  toggleQuest: toggleQuest,
  questFilter: questFilter,
  party: updateParty,
  invites: createInvite,
});

export default App;
