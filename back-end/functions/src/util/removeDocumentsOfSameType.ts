import admin = require("firebase-admin");

const removeDocumentsOfSameType = async (type: string) => {
  const snapshot = await admin
    .firestore()
    .collection("lectures")
    .where("type", "==", type)
    .get();

  return Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
};

export default removeDocumentsOfSameType;
