import admin = require("firebase-admin");

const checkIfURLexistsInDatabase = (url: string) => {
  return admin
    .firestore()
    .collection("workbooks")
    .where("url", "==", url)
    .get()
    .then(snapshot => {
      return !snapshot.empty;
    })
    .catch(err => {
      console.log(err);

      // prevents updating database if there was an error
      return true;
    });
};

export default checkIfURLexistsInDatabase;
