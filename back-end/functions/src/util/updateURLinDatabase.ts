import admin = require("firebase-admin");

const updateURLinDatabase = async (url: string, type: string) => {
  const snapshot = await admin
    .firestore()
    .collection("workbooks")
    .where("type", "==", type)
    .get();

  snapshot.docs.map(doc => {
    doc.ref.delete();
  });

  return admin
    .firestore()
    .collection("workbooks")
    .doc()
    .set({
      url,
      type,
      updated_at: new Date().toISOString()
    });
};

export default updateURLinDatabase;
