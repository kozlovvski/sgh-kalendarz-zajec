import admin from "firebase-admin";
import * as functions from "firebase-functions";
import requestPromise from "request-promise";
import XLSX from "xlsx";

import { SheetLecture } from "../ownTypes";
import checkIfURLexistsInDatabase from "./util/checkIfURLexistsInDatabase";
import inputNewDocuments from "./util/inputNewDocuments";
import parseSheetObject from "./util/parseSheetObject";
import removeDocumentsOfSameType from "./util/removeDocumentsOfSameType";

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
    } else {
      return;
    }
  }
);

export default readLeacturesFromXLS;
