import { File } from '../File';
import { RealtimeDatabasePaths } from '../RealtimeDatabasePaths';

/**
 * Der Typ `files.collection.ts` repräsentiert eine Struktur zur Speicherung von
 * Sammlungsdaten in der RealtimeDatabase.
 *
 * Jeder Schlüssel in `files.collection.ts` entspricht einem Schlüssel in den
 * `REALTIME_DATABASE_PATHS`. Dies sind die Arten von Dateien, die wir in unserer Anwendung behandeln.
 *
 * Jeder Schlüssel in `FilesCollection.ts` ist optional und wenn er vorhanden ist,
 * sollte er mit einem Array von Strings assoziiert sein. Jeder String in diesem Array
 * stellt eine URL dar, die auf eine Datei in Firebase Storage verweist.
 *
 * Diese Struktur ermöglicht es uns, auf effiziente Weise auf die Dateien zuzugreifen, die
 * einem bestimmten Benutzer (identifiziert durch die User ID) und einem bestimmten
 * Dateityp (identifiziert durch den Schlüssel) zugeordnet sind.
 */
export type FilesCollection = {
    [K in keyof RealtimeDatabasePaths]?: File[];
}
