import { combineReducers } from "redux";
import { reducer as auth } from "./Auth";
import { reducer as comment } from "./Comment";
import { reducer as contactMail } from "./ContactMail";
import { reducer as governate } from "./Governate";
import { reducer as mail } from "./Mail";
import { reducer as offer } from "./Offer";
import { reducer as order } from "./Order";
import { reducer as rating } from "./Rating";
import { reducer as tracking } from "./Tracking";
import { reducer as zone } from "./Zone";

// Combine all reducers.
const rootReducer = combineReducers({
  auth,
  comment,
  contactMail,
  governate,
  mail,
  offer,
  order,
  rating,
  tracking,
  zone,
});

export default rootReducer;
