import * as functions from "firebase-functions";
import admin from "firebase-admin";
import request from "request";
import requestPromise from "request-promise";

import XLSX from "xlsx";
import { SheetLecture, LecturesEntry } from "../ownTypes";
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const parseSheetObject = (data: SheetLecture, type: string): LecturesEntry => {
  // see example objects in ../ownTypes.d.ts
  const przedmiot_split = data.Przedmiot.split(/(?<=\d)\ (?=\w)/);
  const lecturer = data.Prowadzący.replace(/[-\d\s]{2,}/, "");

  const res = {
    signature: przedmiot_split[0],
    name: przedmiot_split[1],
    start_time: data.Poczatek,
    end_time: data.Koniec,
    dates: data["Daty zajęć (dd-mm-rr)"],
    form: data.Forma,
    group: String(data["Numer grupy"]),
    lecturer,
    type
  };

  return res;
};

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

const removeDocumentsOfSameType = async (type: string) => {
  const snapshot = await admin
    .firestore()
    .collection("lectures")
    .where("type", "==", type)
    .get();

  return Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
};

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

const readLeacturesFromXLS = functions.https.onCall(
  async (url: string, context) => {
    const wasAlreadyFetched = await checkIfURLexistsInDatabase(url);

    if (!wasAlreadyFetched) {
      return requestPromise(url, { encoding: null })
        .then(data => {
          // create a workbook object from buffer
          var workbook = XLSX.read(data, { type: "buffer" });

          const sheetNames = workbook.SheetNames;
          // override a wrong type definition
          const sheetSummaries = workbook.Workbook?.Sheets as {
            name: string;
            Hidden: number;
          }[];

          // parse only sheets that are visible (not hidden or very-hidden)

          sheetNames.forEach(async sheetName => {
            const currentSheet = workbook.Sheets[sheetName];

            // if sheet is visible
            if (
              sheetSummaries.some(
                sheet => sheet.name === sheetName && sheet.Hidden === 0
              )
            ) {
              const sheetLecture = XLSX.utils.sheet_to_json(
                currentSheet
              ) as SheetLecture[];

              const entriesToSend = sheetLecture.map(lecture =>
                parseSheetObject(lecture, sheetName)
              );

              await removeDocumentsOfSameType(sheetName);
              await inputNewDocuments(entriesToSend);
            } else {
            }
          });
        })
        .catch(err => {
          console.log(err);
          return false;
        });

      return requestPromise(url, { encoding: null }, (err, res, data) => {
        return true;
      });

      return request(url, { encoding: null }, function(err, res, data) {
        // return if not successful
        if (err || res.statusCode !== 200) return;

        // create a workbook object from buffer
        var workbook = XLSX.read(data, { type: "buffer" });

        const sheetNames = workbook.SheetNames;
        // override a wrong type definition
        const sheetSummaries = workbook.Workbook?.Sheets as {
          name: string;
          Hidden: number;
        }[];

        // parse only sheets that are visible (not hidden or very-hidden)

        return Promise.all(
          sheetNames.map(async sheetName => {
            const currentSheet = workbook.Sheets[sheetName];

            // if sheet is visible
            if (
              sheetSummaries.some(
                sheet => sheet.name === sheetName && sheet.Hidden === 0
              )
            ) {
              const sheetLecture = XLSX.utils.sheet_to_json(
                currentSheet
              ) as SheetLecture[];

              const entriesToSend = sheetLecture.map(lecture =>
                parseSheetObject(lecture, sheetName)
              );

              await removeDocumentsOfSameType(sheetName);
              await inputNewDocuments(entriesToSend);

              return true;
            } else {
              return false;
            }
          })
        );
      });
    } else {
      return;
    }
  }
);

export default readLeacturesFromXLS;
