/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import fetch from "node-fetch";

export const detectTextInImage = onRequest(async (request, response) => {
  const imageUri: string = request.body.imageUri;
  const apiKey: string = request.body.apiKey;

  if (!apiKey) {
    logger.error("Aborted textExtraction from Image. No API Key given.")
    response.status(400).send('No API Key given');
    return
  }

  const visionAPIUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestData = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": imageUri
          }
        },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ]
      }
    ]
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  }

  try {
    const res = await fetch(visionAPIUrl, requestOptions);
    const data: any = await res.json();
    logger.debug(data);
    response.send(data);

  } catch (error) {
    logger.error('Error:', error);
    response.status(500).send(error);
  }

});
