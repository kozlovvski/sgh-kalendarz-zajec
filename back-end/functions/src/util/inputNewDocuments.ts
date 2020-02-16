import { LecturesEntry } from "../../ownTypes";
import admin = require("firebase-admin");

const inputNewDocuments = (list: LecturesEntry[]) => {
  return Promise.all(
    list.map(item => {
      return admin
        .firestore()
        .collection("lectures")
        .doc()
        .set(item);
    })
  );
};

export default inputNewDocuments;
